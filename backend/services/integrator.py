import json
from pathlib import Path

from services.network_graph import (
    load_network_data,
    load_fault_signatures,
    build_network_graph,
    analyze_fault,
)


BASE_DIR = Path(__file__).resolve().parent.parent

ALERTS_FILE = BASE_DIR / "data" / "fault_alerts.json"
MAPPING_FILE = BASE_DIR / "data" / "integration_mapping.json"


def load_json(file_path):
    with open(file_path, "r", encoding="utf-8-sig") as file:
        return json.load(file)


def get_latest_fault_alert():
    """Get the latest ML-detected fault from fault_alerts.json."""

    alerts = load_json(ALERTS_FILE)

    detected_alerts = [
        alert for alert in alerts if alert.get("status") == "Fault Detected"
    ]

    if not detected_alerts:
        return None

    return detected_alerts[-1]


def integrate_fault_detection():
    """
    Integrate ML anomaly detection with electrical
    network/domain logic.
    """

    # -----------------------------
    # 1. Load ML result
    # -----------------------------
    ml_alert = get_latest_fault_alert()

    if ml_alert is None:
        return {
            "status": "No fault detected",
            "ml_result": None,
        }

    # -----------------------------
    # 2. Load integration mapping
    # -----------------------------
    mapping = load_json(MAPPING_FILE)

    domain_mapping = mapping["domain_mapping"]
    dashboard_mapping = mapping["dashboard"]

    fault_type = domain_mapping["fault_type"]
    fault_node = domain_mapping["asset_id"]

    # -----------------------------
    # 3. Build electrical network
    # -----------------------------
    network_data = load_network_data()
    fault_signatures = load_fault_signatures()

    graph = build_network_graph(network_data)

    # -----------------------------
    # 4. Analyze fault
    # -----------------------------
    analysis = analyze_fault(
        graph,
        fault_signatures,
        fault_node=fault_node,
        fault_type=fault_type,
    )

    # -----------------------------
    # 5. Create final dashboard result
    # -----------------------------
    result = {
        "scenario_id": mapping["scenario_id"],
        "ml_result": {
            "detector": mapping["ml_result"]["detector"],
            "status": ml_alert["status"],
            "timestamp": ml_alert["timestamp"],
            "anomaly_score": ml_alert["anomaly_score"],
            "current": ml_alert["current_Ia"],
            "voltage": ml_alert["voltage_Va"],
        },
        "fault": {
            "fault_id": domain_mapping["fault_id"],
            "fault_type": analysis["fault_type"],
            "display_name": analysis["display_name"],
            "severity": analysis["severity"],
            "probable_causes": analysis["probable_causes"],
        },
        "location": {
            "asset_id": fault_node,
            "feeder_id": domain_mapping["feeder_id"],
            "affected_village": domain_mapping["affected_village"],
        },
        "affected_villages": analysis["affected_villages"],
        "dashboard": {
            "confidence": dashboard_mapping["confidence"],
            "probable_cause": dashboard_mapping["probable_cause"],
        },
    }

    return result


def main():
    result = integrate_fault_detection()

    print("\n========================================")
    print(" E-VIDYUT RAKSHAK - FAULT INTEGRATION")
    print("========================================")

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
