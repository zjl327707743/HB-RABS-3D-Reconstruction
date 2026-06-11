# HB-RABS v0.5 Three.js Final Visual Draft

This folder contains the v0.5 Three.js final visual draft. It keeps the v0.3.1 pipe/valve correction and applies final visual placement fixes for tabletop details.

Base structure:
- `chamber_shell`
- `glass_panels`
- `rear_wall`
- `workbench`
- `glove_ports`
- `lights_camera`

v0.5 display objects include:

- `top_assembly_blockout`
- `center_funnel_pair`
- `center_vessel`
- `center_vessel_lid_stack`
- `center_vessel_flange_ring`
- `center_vessel_clamp_blocks`
- `left_horizontal_pipe_blockout`
- `right_horizontal_pipe_blockout`
- `left_black_handwheel`
- `right_black_handwheel`
- `left_white_hose_blockout`
- `right_white_hose_blockout`
- `main_tubing_blockout`
- `rear_ports_blockout`
- `rear_white_disc`
- `rear_right_corrugated_hose_blockout`
- `small_static_parts`
- `blue_sterile_wrap`
- `small_metal_funnel_part`
- `left_loose_clamp`
- `left_lift_door_panel`
- `right_lift_door_panel`
- `left_lift_door_guide_rails`
- `right_lift_door_guide_rails`
- `airflow_mist_planes`

`right_vessel` remains deprecated and is not instantiated in the scene. v0.5 uses only static details: no people, arms, tool motion, particle smoke, or screw-level fittings.

## Run

```bash
cd 02_threejs
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://127.0.0.1:5173/`.

## How To Share

Local preview:

```bash
cd 02_threejs
npm install
npm run dev
```

Build static files:

```bash
npm run build
```

The build output is `02_threejs/dist/`. You can zip and send the `dist/` folder for review; the receiver should open it with a local static server, or deploy it to GitHub Pages, Netlify, Vercel, or an internal server. Avoid double-clicking `index.html` directly because browser security rules can affect ES module paths.

## Coordinate System

The scene follows `03_docs/coordinate_system.md`:

- X: left/right, right is positive
- Y: up/down, up is positive
- Z: front/back, toward viewer is positive
- Origin: temporary workbench center near the future central equipment axis
- Units: visual modeling units, not millimeters

Shared dimensions live in `src/scene/scale.js` as `SCENE_SCALE`. All v0.2 objects use this config for placement.

## Camera Presets

- `camera_overall_front`
- `camera_front_straight`
- `camera_table_view`
- `camera_side_depth`
- `camera_top_overview`

## Reference Images Used

Primary references are the confirmed A_overall images:

- `01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg`
- `01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg`
- `01_reference_frames/A_overall/A_overall_03_original_frame_000004.jpg`
- `01_reference_frames/A_overall/A_overall_04_original_frame_000057.jpg`

Secondary references are listed in `src/scene/objectRegistry.js`.

## Object Registry

`src/scene/objectRegistry.js` records the draft objects with id, display name, category, version, status, reference images, and notes. Meshes and groups set `userData.id` for object identification.

## Verification

The v0.5 build is verified with:

```bash
npm run build
```

No automatic screenshots are generated in v0.5. Use the fixed camera buttons for manual review captures.

## v0.2.1 Glove Port Correction

Manual visual review found that the v0.2 glove port layout was wrong: it used two large lower glove ports plus two smaller upper auxiliary ports. The corrected v0.2.1 layout has four equal-size glove ports, evenly spaced across one horizontal line on the lower front glass panel.

Current port layout:

| ID | Radius | Center |
|---|---:|---|
| `glove_port_01` | 0.55 | `(-3.3, 1.08, frontGlassZ + 0.06)` |
| `glove_port_02` | 0.55 | `(-1.1, 1.08, frontGlassZ + 0.06)` |
| `glove_port_03` | 0.55 | `(1.1, 1.08, frontGlassZ + 0.06)` |
| `glove_port_04` | 0.55 | `(3.3, 1.08, frontGlassZ + 0.06)` |

The v0.2.1 four equal glove ports remain unchanged in v0.5.

## v0.3.1 Equipment Correction

Manual visual review found that v0.3 incorrectly modeled the right side as an independent `right_vessel`. In v0.3.1, the right side is corrected to a horizontal stainless pipe with a black handwheel, couplings, and a white hose. A matching left-side horizontal pipe, black handwheel, and white hose were added for blockout symmetry.

The central vessel remains the only main cylindrical vessel. The two funnel necks now route into left/right bend pipes that transition toward the corresponding horizontal valve lines. `right_vessel` remains in the object registry only as `removed_or_deprecated_v0.3.1`.

## v0.4 Display Draft

v0.4 strengthens the top assembly, dual funnels, center vessel lid/flange/clamps, horizontal pipes, handwheel blades, hose corrugation, rear wall discs/ports, sparse workbench perforations, static tabletop parts, and low-opacity mist planes. These details are static display geometry only.

## v0.5 Final Visual Draft

v0.5 moves the dish/lid to the right rear perforated table area, adds the blue sterile wrap with small metal funnel/connector parts, refines the left loose clamp, enlarges the static wrench/stand, and reduces mist/glass visual obstruction.

The v0.5 cleanup pass separates the dish and lid, removes the extra white disc in front of the left clamp, adds static side lift/transfer doors, and simplifies extra hose rings while preserving key flanges and clamps.

The latest structure correction adds two upper hard inlet pipes above the dual funnels, removes the outer white hoses beyond the left/right black valves, and changes the lower funnel-to-valve runs into two dark hard pipes.

The 2026-06-11 correction removes rear-wall circular placeholders and the shared large top disk, then makes the funnel upper connectors and lower bends read as independent stainless hard-pipe structures.

## Next Step

Proceed to manual v0.5 screenshot review from overall front, straight front, table view, and side/depth views.
