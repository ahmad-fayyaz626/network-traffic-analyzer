const BASE_URL = "http://127.0.0.1:5000"

const apiCall = async (endpoint, method = "GET") => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        })

        // If Flask returned an error status
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`)
        }

        return await response.json()

    } catch (error) {
        console.error(`Failed to call ${endpoint}:`, error)
        return null
    }
}

// Tell Flask to start Scapy capturing
export const startCapture = async () => {
    return await apiCall("/start", "POST")
}

// Tell Flask to stop Scapy capturing
export const stopCapture = async () => {
    return await apiCall("/stop", "POST")
}


export const clearPackets = async () => {
    return await apiCall("/clear", "POST")
}

export const getStatus = async () => {
    return await apiCall("/status", "GET")
}

// Get all packets — with optional filters
// filters is an object like:
// { protocol: "TCP", src_ip: "192.168.1.5", dst_ip: "" }
export const getPackets = async (filters = {}) => {

    // Build query string from filters
    // Only include filters that have actual values
    const params = new URLSearchParams()

    if (filters.protocol) params.append("protocol", filters.protocol)
    if (filters.src_ip)   params.append("src_ip",   filters.src_ip)
    if (filters.dst_ip)   params.append("dst_ip",   filters.dst_ip)

    // If we have filters add them to URL
    // Otherwise just call /packets with no filters
    const queryString = params.toString()
    const endpoint    = queryString
                        ? `/packets?${queryString}`
                        : "/packets"

    return await apiCall(endpoint, "GET")
}

export const getStats = async () => {
    return await apiCall("/stats", "GET")
}

export const checkHealth = async () => {
    return await apiCall("/", "GET")
}