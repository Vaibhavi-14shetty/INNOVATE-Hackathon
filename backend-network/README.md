Backend / Domain Logic Component — Feeder Network & Routing (e-VidyutRakshak)

Graph-based feeder network model + fault-type reference data + integration layer that enriches the ML component's anomaly output with location and inspection routing. This is the "Domain Logic / Data Layer" piece of the e-VidyutRakshak Round 2 demo build.

What this notebook does
Defines a mock feeder network (7 nodes: 1 substation → 2 feeders → 2 transformers → 2 villages) as a graph
Defines 4 realistic fault-type signatures (conductor damage, transformer overload, vegetation contact, illegal connection) with voltage/current patterns
Builds the network as a NetworkX graph and demonstrates shortest-path routing (proof-of-concept for the Dijkstra/A* routing described in the project abstract)
Loads the real output from the ML component (ml-anomaly-detection/outputs/fault_alerts.json) and enriches it — assigns each detected fault to a village and computes a recommended inspection path
Outputs
File	Contents
outputs/feeder_network.json	The mock feeder network structure (nodes + edges)
outputs/fault_signatures.json	4 fault types with descriptions and electrical signatures
outputs/enriched_fault_alerts.json	Small sample (5 entries) — ML's fault-only alerts + assigned village + computed inspection route. Use this for report tables/screenshots
outputs/enriched_timeseries.json	Full stream (300 entries, mostly normal + 13 faults) — ML's full time-series + village/route enrichment on fault rows. Use this for live demo/video playback
How to run
Make sure ml-anomaly-detection/ (sibling folder) already has outputs/fault_alerts.json AND outputs/timeseries_readings.json generated
Open notebooks/network_backend.ipynb in Jupyter
Run all cells top to bottom (Section 1: small-sample enrichment, Section 2: full time-series enrichment)
Check outputs/enriched_fault_alerts.json (report) and outputs/enriched_timeseries.json (demo) for results
Known limitations (be upfront about these in the report)
Feeder network (7 nodes, 2 villages) is a small mock network, not a real rural grid topology — built to demonstrate the graph/routing concept, not to represent an actual district
Village assignment for each fault is randomly chosen for demo purposes — the ML dataset has no real location signal to determine this genuinely. In a real deployment, this would come from which physical sensor/transformer reported the reading
Routing uses simple unweighted shortest_path (fewest hops), not real distance/travel-time weighted Dijkstra/A* — that's planned as Phase 2, this is the proof-of-concept
fault_type is still "unclassified" since XGBoost classification isn't built yet — once it is, this field will show a real predicted type matching fault_signatures.json keys
No hardware/live sensor integration — software-only prototype using historical/simulated data, consistent with the ML component's scope