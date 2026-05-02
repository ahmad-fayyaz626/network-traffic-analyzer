from sniffer import get_packets


def calculate_stats ():
    packets = get_packets()
    if not packets:
        return {
            "total_packets":    0,
            "protocol_counts":  {},
            "average_size":     0,
            "total_size":       0,
            "top_src_ip":       "N/A",
            "top_service":      "N/A",
            "smallest_packet":  0,
            "largest_packet":   0,
        }
    

    total_packets = len (packets)
    protocol_counts = {}
    for packet in packets:
        protocol = packet["protocol"]
        if protocol not in protocol_counts:
            protocol_counts[protocol]=1
        else:
            protocol_counts[protocol] +=1
    # Packet Size

    sizes = []

    for packet in packets:
        size = packet["size"]
        if isinstance (size , int):
            sizes.append (size)
    total_size = sum (sizes)
    average_size = round(total_size / len(sizes))
    smallest_packet = min (sizes) if sizes else 0
    largest_packet = max (sizes) if sizes else 0

    #most active source IP

    ip_counts = {}
    for packet in packets:
        src_ip = packet["src_ip"]
        if src_ip not in ip_counts:
            ip_counts[src_ip] = 1
        else:
            ip_counts[src_ip] +=1
    top_src_ip = max (ip_counts , key=lambda ip: ip_counts[ip])
    service_counts = {}
    for packet in packets:
        service = packet["service"]

        # Skip unknown and N/A services
        if service in ("Unknown", "N/A"):
            continue

        if service in service_counts:
            service_counts[service] += 1
        else:
            service_counts[service] = 1

    # Only find top service if we have any known services
    top_service = "N/A"
    if service_counts:
        top_service = max(
            service_counts,
            key=lambda s: service_counts[s]
        )

   
    return {
        "total_packets":    total_packets,
        "protocol_counts":  protocol_counts,
        "average_size":     average_size,
        "total_size":       total_size,
        "top_src_ip":       top_src_ip,
        "top_service":      top_service,
        "smallest_packet":  smallest_packet,
        "largest_packet":   largest_packet,
    }

    
