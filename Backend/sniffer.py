from scapy.all import sniff, IP, TCP, UDP, ICMP, Ether, ARP, Raw
from datetime import datetime
import threading

from protocols import (
    get_protocol_name,
    get_service_name,
    get_flag_name,
    get_protocol_color
)
captured_packets = []        # all packets stored here
is_capturing     = False     # controls start and stop
capture_thread   = None      # holds the background thread
packet_id        = 0         # unique id for each packet



def extract_packet(packet):
    global packet_id

    # We only care about packets that have an IP layer
    # ARP packets don't have IP so we handle separately
    if not IP in packet and not ARP in packet:
        return None

    time_now = datetime.now().strftime("%H:%M:%S")

   
    size = len(packet)
    mac_src = packet[Ether].src if Ether in packet else "N/A"
    mac_dst = packet[Ether].dst if Ether in packet else "N/A"

    # ARP is a special protocol that doesn't have IP layer
    # It is used to find MAC address of an IP on local network
    if ARP in packet and IP not in packet:
        packet_id += 1
        return {
            "id":       packet_id,
            "time":     time_now,
            "src_ip":   packet[ARP].psrc,
            "dst_ip":   packet[ARP].pdst,
            "src_port": "N/A",
            "dst_port": "N/A",
            "protocol": "ARP",
            "service":  "ARP",
            "size":     size,
            "ttl":      "N/A",
            "flags":    "N/A",
            "mac_src":  mac_src,
            "mac_dst":  mac_dst,
            "color":    get_protocol_color("ARP")
        }

    
    src_ip       = packet[IP].src
    dst_ip       = packet[IP].dst
    ttl          = packet[IP].ttl
    proto_number = packet[IP].proto
    proto_name   = get_protocol_name(proto_number)

    # These live inside TCP or UDP layer
    src_port = None
    dst_port = None
    flags    = "N/A"

    if TCP in packet:
        src_port   = packet[TCP].sport
        dst_port   = packet[TCP].dport
        flags      = get_flag_name(packet[TCP].flags)
        proto_name = "TCP"    # override to TCP for clarity

    elif UDP in packet:
        src_port   = packet[UDP].sport
        dst_port   = packet[UDP].dport
        proto_name = "UDP"

    elif ICMP in packet:
        proto_name = "ICMP"

  
    service = get_service_name(dst_port)
    color = get_protocol_color(proto_name)
    packet_id += 1
    return {
        "id":       packet_id,
        "time":     time_now,
        "src_ip":   src_ip,
        "dst_ip":   dst_ip,
        "src_port": src_port if src_port else "N/A",
        "dst_port": dst_port if dst_port else "N/A",
        "protocol": proto_name,
        "service":  service,
        "size":     size,
        "ttl":      ttl,
        "flags":    flags,
        "mac_src":  mac_src,
        "mac_dst":  mac_dst,
        "color":    color
    }

def process_packet(packet):
    global is_capturing
    if not is_capturing:
        return

    # Extract all fields from this packet
    extracted = extract_packet(packet)

    # If extraction returned something useful — store it
    if extracted:
        captured_packets.append(extracted)
        print ("Packet is appended")

def start_capture():
    global is_capturing, capture_thread, captured_packets, packet_id

    # If already capturing — do nothing
    if is_capturing:
        return

    # Reset everything for fresh capture
    captured_packets = []
    packet_id        = 0
    is_capturing     = True

    capture_thread = threading.Thread(
        target=lambda: sniff(
            prn=process_packet,
            store=False           
        ),
        daemon=True              
    )
    capture_thread.start()


def stop_capture():
    global is_capturing
    is_capturing = False

def get_packets():
    return captured_packets


def get_status():
    return {
        "is_capturing":  is_capturing,
        "packet_count":  len(captured_packets)
    }