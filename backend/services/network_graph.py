import json
from pathlib import Path

import networkx as nx


# Find the project data files
BASE_DIR = Path(__file__).resolve().parent.parent
NETWORK_FILE = BASE_DIR / "data" / "feeder_network.json"
FAULT_FILE = BASE_DIR / "data" / "fault_signatures.json"


def load_network_data():
    """Load feeder network data from JSON."""
    with open(NETWORK_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def load_fault_signatures():
    """Load fault signature information from JSON."""
    with open(FAULT_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def build_network_graph(data):
    """Build a directed NetworkX graph from feeder network data."""
    graph = nx.DiGraph()

    # Add substation
    substation = data["substation"]

    graph.add_node(
        substation["id"],
        name=substation["name"],
        type=substation["type"],
        voltage_kv=substation["voltage_kv"],
        status=substation["status"],
    )

    # Add feeders
    for feeder in data["feeders"]:
        graph.add_node(
            feeder["id"],
            name=feeder["name"],
            type=feeder["type"],
            voltage_kv=feeder["voltage_kv"],
            status=feeder["status"],
        )

        graph.add_edge(feeder["parent"], feeder["id"])

    # Add transformers
    for transformer in data["transformers"]:
        graph.add_node(
            transformer["id"],
            name=transformer["name"],
            type=transformer["type"],
            capacity_kva=transformer["capacity_kva"],
            current_load_percent=transformer["current_load_percent"],
            status=transformer["status"],
        )

        graph.add_edge(transformer["parent"], transformer["id"])

    # Add villages
    for village in data["villages"]:
        graph.add_node(
            village["id"],
            name=village["name"],
            type=village["type"],
            consumers=village["consumers"],
        )

        graph.add_edge(village["parent"], village["id"])

    return graph


def get_downstream_villages(graph, fault_node):
    """Return all villages downstream of a fault location."""

    if fault_node not in graph:
        raise ValueError(f"Node '{fault_node}' does not exist in the network.")

    affected_villages = []

    # Find all nodes reachable downstream
    descendants = nx.descendants(graph, fault_node)

    for node in descendants:
        if graph.nodes[node].get("type") == "village":
            affected_villages.append(node)

    return sorted(affected_villages)


def analyze_fault(graph, fault_signatures, fault_node, fault_type):
    """Combine fault information with affected network locations."""

    # Find the requested fault type
    fault_info = None

    for fault in fault_signatures["fault_signatures"]:
        if fault["fault_type"] == fault_type:
            fault_info = fault
            break

    if fault_info is None:
        raise ValueError(f"Fault type '{fault_type}' does not exist.")

    # Find affected villages
    affected_villages = get_downstream_villages(graph, fault_node)

    # Convert village IDs into useful information
    affected_village_details = []

    for village_id in affected_villages:
        village_data = graph.nodes[village_id]

        affected_village_details.append(
            {
                "id": village_id,
                "name": village_data["name"],
                "consumers": village_data["consumers"],
            }
        )

    return {
        "fault_location": fault_node,
        "fault_type": fault_info["fault_type"],
        "display_name": fault_info["display_name"],
        "probable_causes": fault_info["probable_causes"],
        "electrical_signatures": fault_info["electrical_signatures"],
        "severity": fault_info["severity"],
        "affected_villages": affected_village_details,
    }


def main():
    # Load data
    data = load_network_data()
    fault_signatures = load_fault_signatures()

    # Build NetworkX graph
    graph = build_network_graph(data)

    print("Network graph created successfully.")
    print("Number of nodes:", graph.number_of_nodes())
    print("Number of connections:", graph.number_of_edges())

    # --------------------------------------------------
    # Test shortest paths
    # --------------------------------------------------

    source = "S1"
    destinations = ["V1", "V3", "V5"]

    for destination in destinations:
        path = nx.shortest_path(graph, source=source, target=destination)

        print(f"\nShortest path from {source} to {destination}:")
        print(" -> ".join(path))

    # --------------------------------------------------
    # Test downstream village detection
    # --------------------------------------------------

    fault_nodes = ["T1", "T2", "F1", "F2"]

    for fault_node in fault_nodes:
        affected_villages = get_downstream_villages(graph, fault_node)

        print(f"\nFault detected at {fault_node}")
        print("Affected downstream villages:")

        for village in affected_villages:
            village_name = graph.nodes[village]["name"]
            print(f"- {village} ({village_name})")

    # --------------------------------------------------
    # Test complete fault analysis
    # --------------------------------------------------

    test_cases = [
        ("T1", "conductor_damage"),
        ("T2", "transformer_overload"),
        ("F1", "vegetation_contact"),
        ("F2", "illegal_tapping"),
    ]

    for fault_node, fault_type in test_cases:
        fault_analysis = analyze_fault(
            graph, fault_signatures, fault_node=fault_node, fault_type=fault_type
        )

        print("\n--- Complete Fault Analysis ---")
        print("Fault Location:", fault_analysis["fault_location"])
        print("Fault Type:", fault_analysis["display_name"])
        print("Severity:", fault_analysis["severity"])

        print("Probable Causes:")

        for cause in fault_analysis["probable_causes"]:
            print(f"- {cause}")

        print("Affected Villages:")

        for village in fault_analysis["affected_villages"]:
            print(
                f"- {village['id']} "
                f"({village['name']}) "
                f"[{village['consumers']} consumers]"
            )


if __name__ == "__main__":
    main()
