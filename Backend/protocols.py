# ================================================================
# protocols.py
# All protocol mappings, service mappings, flag mappings
# This file is imported by sniffer.py and stats.py
# ================================================================

# ----------------------------------------------------------------
# IP PROTOCOL MAP
# These are official IANA assigned protocol numbers
# When Scapy gives us packet[IP].proto we look it up here
# ----------------------------------------------------------------
import socket
IP_PROTOCOLS = {
    0:   "HOPOPT",
    1:   "ICMP",
    2:   "IGMP",
    4:   "IPv4",
    6:   "TCP",
    8:   "EGP",
    9:   "IGP",
    17:  "UDP",
    41:  "IPv6",
    43:  "IPv6-Route",
    44:  "IPv6-Frag",
    47:  "GRE",
    50:  "ESP",
    51:  "AH",
    58:  "ICMPv6",
    89:  "OSPF",
    103: "PIM",
    112: "VRRP",
    115: "L2TP",
    132: "SCTP",
    137: "MPLS-in-IP"
}


# ----------------------------------------------------------------
# SERVICE MAP
# Port number → service name
# We check DESTINATION port to identify the service
# ----------------------------------------------------------------
SERVICE_MAP = {
    # Web
    80:    "HTTP",
    443:   "HTTPS",
    8080:  "HTTP-Alt",
    8443:  "HTTPS-Alt",

    # Email
    25:    "SMTP",
    465:   "SMTPS",
    587:   "SMTP-Submit",
    110:   "POP3",
    995:   "POP3S",
    143:   "IMAP",
    993:   "IMAPS",

    # File Transfer
    20:    "FTP-Data",
    21:    "FTP-Control",
    22:    "SSH",
    69:    "TFTP",
    115:   "SFTP",

    # DNS and Network
    53:    "DNS",
    67:    "DHCP-Server",
    68:    "DHCP-Client",
    123:   "NTP",
    161:   "SNMP",
    162:   "SNMP-Trap",

    # Remote Access
    23:    "Telnet",
    3389:  "RDP",
    5900:  "VNC",

    # Database
    1433:  "MSSQL",
    1521:  "Oracle-DB",
    3306:  "MySQL",
    5432:  "PostgreSQL",
    6379:  "Redis",
    27017: "MongoDB",

    # Streaming and Media
    554:   "RTSP",
    1935:  "RTMP",
    5004:  "RTP",

    # Messaging
    5222:  "XMPP",
    5223:  "XMPP-SSL",
    6667:  "IRC",
    6697:  "IRC-SSL",

    # Security
    500:   "IKE-VPN",
    1194:  "OpenVPN",
    1701:  "L2TP",
    1723:  "PPTP",

    # Misc
    179:   "BGP",
    389:   "LDAP",
    636:   "LDAPS",
    5353:  "mDNS",
    5060:  "SIP",
    5061:  "SIP-TLS",
}


# ----------------------------------------------------------------
# TCP FLAGS MAP
# TCP flags tell us what kind of TCP communication is happening
# packet[TCP].flags gives us a combination of these
# ----------------------------------------------------------------
TCP_FLAGS = {
    "F":  "FIN",       # Finish — closing connection
    "S":  "SYN",       # Synchronize — starting connection
    "R":  "RST",       # Reset — force closing connection
    "P":  "PSH",       # Push — send data immediately
    "A":  "ACK",       # Acknowledge — confirming receipt
    "U":  "URG",       # Urgent — priority data
    "E":  "ECE",       # ECN Echo
    "C":  "CWR",       # Congestion Window Reduced
    "S":  "SYN",
    "SA": "SYN-ACK",   # Response to SYN — connection accepted
    "PA": "PSH-ACK",   # Most common — data transfer
    "FA": "FIN-ACK",   # Closing acknowledgement
    "RA": "RST-ACK",   # Force close acknowledgement
}


# ----------------------------------------------------------------
# HELPER FUNCTIONS
# These are called by sniffer.py to look up values
# ----------------------------------------------------------------

def get_protocol_name(proto_number):
    """
    Takes protocol number from packet[IP].proto
    Returns human readable name
    Example: 6 → TCP , 17 → UDP , 89 → OSPF
    """
    return IP_PROTOCOLS.get(proto_number, f"UNKNOWN({proto_number})")


def get_service_name(port):
    """
    Takes destination port number
    Returns service name
    Example: 443 → HTTPS , 3306 → MySQL
    """
    if port is None:
        return "N/A"

    service_name = SERVICE_MAP.get(port)
    if service_name:
        return service_name
    return "Unknown"


   


def get_flag_name(flags):
    """
    Takes TCP flags from packet[TCP].flags
    Returns human readable flag string
    Example: PA → PSH-ACK , S → SYN
    """
    if flags is None:
        return "N/A"
    return TCP_FLAGS.get(str(flags), str(flags))


def get_protocol_color(protocol_name):
    """
    Returns a color for each protocol
    Used by React frontend to color code rows in the table
    Just like Wireshark colors packets differently
    """
    colors = {
        "TCP":   "#e8f4fd",   # light blue
        "UDP":   "#e8fde8",   # light green
        "ICMP":  "#fdf5e8",   # light orange
        "DNS":   "#fde8f4",   # light pink
        "HTTPS": "#e8fdfd",   # light cyan
        "ARP":   "#f4fde8",   # light yellow
    }
    return colors.get(protocol_name, "#ffffff")   # default white