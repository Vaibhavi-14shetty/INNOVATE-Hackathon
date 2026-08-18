OUTPUT_CONTRACT.md — Backend / Domain Logic Component

Documents the exact structure of this component's 3 output files, for whoever builds the dashboard frontend.

File: outputs/feeder_network.json
json
{
  "nodes": [
    {"id": "SUB1", "type": "substation", "name": "Main Substation", "lat": 18.55, "lon": 73.75}
  ],
  "edges": [
    {"source": "SUB1", "target": "FDR1"}
  ]
}
Field	Description
nodes[].id	Short unique ID, used to reference nodes in edges
nodes[].type	One of: substation, feeder, transformer, village
nodes[].name	Display name — use this for UI labels
nodes[].lat / lon	Coordinates for map markers
edges[]	Connections between node IDs — use for drawing lines on the map

For dashboard: plot each node as a marker (color by type), draw lines for each edge — this is your feeder network map.

File: outputs/fault_signatures.json

Dictionary keyed by fault type (conductor_damage, transformer_overload, vegetation_contact, illegal_connection), each with description, voltage_pattern, current_pattern, typical_cause. Use for tooltips/detail panels when a fault alert is clicked — gives the operator context on what the fault type means and likely cause.

File: outputs/enriched_fault_alerts.json

This is the main file for the dashboard's alert cards — it's the ML component's fault detections, enriched with location + routing. Example:

json
{
  "timestamp": "2026-08-17 14:00:00",
  "current_Ia": 729.85,
  "voltage_Va": -0.004,
  "fault_type": "unclassified",
  "anomaly_score": -0.0293,
  "status": "Fault Detected",
  "village": "Village Rampur",
  "recommended_inspection_path": ["Main Substation", "Feeder Line A", "Transformer T1", "Village Rampur"],
  "inspection_hops": 3
}
Field	Source	Notes
timestamp, current_Ia, voltage_Va, anomaly_score, status	From ML component, unchanged	See ML component's own OUTPUT_CONTRACT.md
fault_type	From ML component	Still "unclassified" until XGBoost is added
village	Added by this component	Currently randomly assigned (no real location signal exists yet) — display as-is but don't call it "detected location" in the report, call it "assigned"
recommended_inspection_path	Computed by this component	Ordered list of node names from substation to the fault's village
inspection_hops	Computed by this component	Number of edges in the path — display as "X stops to reach site"

For dashboard: use this file to populate the alert cards panel (fault type, village, score) AND to draw a highlighted route line on the map (using recommended_inspection_path matched back to feeder_network.json coordinates).

For whoever integrates this into the dashboard
Load feeder_network.json → draw the base map (markers + connection lines)
Load fault_signatures.json → keep in memory for tooltip lookups
Load enriched_fault_alerts.json → good for a small "recent alerts" report table
Load enriched_timeseries.json → use for the LIVE demo: replay row-by-row (matching the ML component's live-simulation pattern) to drive both the voltage/current graph AND the alert cards/map route highlight in sync, since fault rows here carry village + route while normal rows don't
If only the graph (not alerts) is needed, ML component's plain timeseries_readings.json also works standalone — enriched_timeseries.json is a superset of it with location/routing added