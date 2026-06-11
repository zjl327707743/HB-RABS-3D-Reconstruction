export const objectRegistry = [
  {
    id: "chamber_shell",
    displayName: "RABS chamber shell",
    category: "chamber_base",
    version: "v0.2",
    status: "draft_v0.2",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg",
      "01_reference_frames/A_overall/A_overall_03_original_frame_000004.jpg",
      "01_reference_frames/A_overall/A_overall_04_original_frame_000057.jpg"
    ],
    notes: "Base stainless chamber frame only. No internal production instruments in v0.2."
  },
  {
    id: "glass_panels",
    displayName: "front glass panels",
    category: "chamber_base",
    version: "v0.2",
    status: "draft_v0.2",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/A_overall/A_overall_03_original_frame_000004.jpg"
    ],
    notes: "Transparent front surface used to anchor glove port placement."
  },
  {
    id: "rear_wall",
    displayName: "rear stainless wall",
    category: "chamber_base",
    version: "v0.2",
    status: "draft_v0.2",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_04_original_frame_000057.jpg",
      "01_reference_frames/D_rear_wall_top/D_rear_top_02_airflow_4_3_interval_0019.jpg"
    ],
    notes: "Simple rear wall with light panel seams only. No ports or tube fittings."
  },
  {
    id: "workbench",
    displayName: "stainless workbench",
    category: "chamber_base",
    version: "v0.2",
    status: "draft_v0.2",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/E_tools_small_parts/E_tools_05_original_frame_000009.jpg"
    ],
    notes: "Low stainless table plane with sparse perforation marks for scale."
  },
  {
    id: "glove_ports",
    displayName: "front glove ports",
    category: "chamber_base",
    version: "v0.2.1",
    status: "draft_v0.2.1",
    childObjects: [
      "glove_port_01",
      "glove_port_02",
      "glove_port_03",
      "glove_port_04"
    ],
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg"
    ],
    notes: "v0.2.1 corrected to four equal-size, evenly spaced glove ports based on manual visual review."
  },
  {
    id: "lights_camera",
    displayName: "lights and camera presets",
    category: "scene_support",
    version: "v0.2",
    status: "draft_v0.2",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Ambient, top soft light, OrbitControls, and fixed camera presets."
  },
  {
    id: "center_funnel_pair",
    displayName: "center funnel pair blockout",
    category: "main_equipment_blockout",
    version: "v0.4",
    status: "draft_v0.4",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/B_center_equipment/B_center_06_airflow_4_1_frame_000004.jpg"
    ],
    notes: "Two adjacent upper stainless funnel blockouts with thicker rims, short necks, and rough clamp rings; lower pipes now match stainless hard-pipe visual logic."
  },
  {
    id: "upper_inlet_pipe_pair",
    displayName: "upper inlet pipe pair",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    childObjects: [
      "upper_inlet_pipe_left",
      "upper_inlet_pipe_right"
    ],
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/B_center_equipment/B_center_06_airflow_4_1_frame_000004.jpg"
    ],
    notes: "Two independent extra-thick stainless inlet structures above the funnel mouths, each with its own short lower flange; diameter is close to the funnel mouth scale."
  },
  {
    id: "upper_inlet_pipe_left",
    displayName: "left upper inlet pipe",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_06_airflow_4_1_frame_000004.jpg"
    ],
    notes: "Left coarse vertical stainless upper connection above the left funnel, enlarged to read as an upper material tube."
  },
  {
    id: "upper_inlet_pipe_right",
    displayName: "right upper inlet pipe",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_06_airflow_4_1_frame_000004.jpg"
    ],
    notes: "Right coarse vertical stainless upper connection above the right funnel, enlarged to read as an upper material tube."
  },
  {
    id: "center_vessel",
    displayName: "center vessel blockout",
    category: "main_equipment_blockout",
    version: "v0.4",
    status: "draft_v0.4",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_01_airflow_4_3_interval_0013.jpg",
      "01_reference_frames/B_center_equipment/B_center_07_original_frame_000005.jpg"
    ],
    notes: "Only main cylindrical vessel retained; shortened display draft body to avoid over-blocking glove ports."
  },
  {
    id: "right_vessel",
    displayName: "right vessel blockout (deprecated)",
    category: "main_equipment_blockout",
    version: "v0.3.1",
    status: "removed_or_deprecated_v0.3.1",
    referenceImages: [
      "01_reference_frames/C_right_equipment/C_right_05_airflow_4_2_frame_000004.jpg",
      "01_reference_frames/C_right_equipment/C_right_07_airflow_4_2_frame_000013.jpg"
    ],
    notes: "Deprecated after manual review: real reference shows right-side pipe/valve/handwheel assembly, not an independent vessel. No longer instantiated in scene."
  },
  {
    id: "left_horizontal_pipe_blockout",
    displayName: "left horizontal pipe blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/B_center_equipment/B_center_06_airflow_4_1_frame_000004.jpg"
    ],
    notes: "Left stainless horizontal valve pipe remains at the raised lid/flange height, with Z returned close to the main equipment plane."
  },
  {
    id: "right_horizontal_pipe_blockout",
    displayName: "right horizontal pipe blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/C_right_equipment/C_right_01_airflow_4_3_interval_0001.jpg",
      "01_reference_frames/C_right_equipment/C_right_04_airflow_4_4_interval_0013.jpg"
    ],
    notes: "Right stainless horizontal valve pipe remains at the raised lid/flange height, with Z returned close to the main equipment plane; black handwheel is mounted on this pipe, not on a vessel."
  },
  {
    id: "left_black_handwheel",
    displayName: "left black handwheel blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Left black handwheel remains on the raised horizontal pipe; obvious forward offset has been removed."
  },
  {
    id: "right_black_handwheel",
    displayName: "right black handwheel blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/C_right_equipment/C_right_01_airflow_4_3_interval_0001.jpg",
      "01_reference_frames/C_right_equipment/C_right_04_airflow_4_4_interval_0013.jpg"
    ],
    notes: "Right black wheel remains on the raised horizontal pipe; obvious forward offset has been removed."
  },
  {
    id: "right_pipe_couplings",
    displayName: "right pipe couplings blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/C_right_equipment/C_right_02_airflow_4_3_interval_0005.jpg",
      "01_reference_frames/C_right_equipment/C_right_07_airflow_4_2_frame_000013.jpg"
    ],
    notes: "Inner coupling/flange placeholder raised with the right valve pipe; no outer wall connection."
  },
  {
    id: "left_white_hose_blockout",
    displayName: "left white hose blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "deprecated_no_display",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Removed from scene after review: valve outer-side white hose should not extend toward side/rear wall."
  },
  {
    id: "right_white_hose_blockout",
    displayName: "right white hose blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "deprecated_no_display",
    referenceImages: [
      "01_reference_frames/C_right_equipment/C_right_05_airflow_4_2_frame_000004.jpg",
      "01_reference_frames/C_right_equipment/C_right_07_airflow_4_2_frame_000013.jpg"
    ],
    notes: "Removed from scene after review: valve outer-side white hose should not extend toward side/rear wall."
  },
  {
    id: "main_tubing_blockout",
    displayName: "main tubing blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_02_airflow_4_3_interval_0016.jpg",
      "01_reference_frames/D_rear_wall_top/D_rear_top_02_airflow_4_3_interval_0019.jpg"
    ],
    notes: "Now contains two stainless lower hard pipes with compact vertical drop, 90-degree side turn, and short horizontal connection to the raised black valve lines."
  },
  {
    id: "funnel_lower_hard_pipe_left",
    displayName: "left funnel lower hard pipe",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_02_airflow_4_3_interval_0016.jpg"
    ],
    notes: "Single continuous stainless TubeGeometry pipe from the left funnel neck: short vertical drop, compact left 90-degree bend, then short horizontal connection to the left black valve inner side."
  },
  {
    id: "funnel_lower_hard_pipe_right",
    displayName: "right funnel lower hard pipe",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_02_airflow_4_3_interval_0016.jpg"
    ],
    notes: "Single continuous stainless TubeGeometry pipe from the right funnel neck: short vertical drop, compact right 90-degree bend, then short horizontal connection to the right black valve inner side."
  },
  {
    id: "rear_ports_blockout",
    displayName: "rear ports blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "deprecated_no_display",
    referenceImages: [
      "01_reference_frames/D_rear_wall_top/D_rear_top_01_airflow_4_3_interval_0012.jpg",
      "01_reference_frames/D_rear_wall_top/D_rear_top_04_airflow_4_4_interval_0049.jpg"
    ],
    notes: "Deprecated after structure review: rear wall should remain clean without circular port placeholders."
  },
  {
    id: "top_assembly_blockout",
    displayName: "top assembly blockout",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "draft_v0.5.x",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg",
      "01_reference_frames/D_rear_wall_top/D_rear_top_01_airflow_4_3_interval_0012.jpg"
    ],
    notes: "Shared large round top disk removed after structure review; object now keeps only the black center block and light support bars."
  },
  {
    id: "top_shared_large_round_cover",
    displayName: "deprecated shared top round cover",
    category: "main_equipment_blockout",
    version: "v0.5.x",
    status: "deprecated_no_display",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg"
    ],
    notes: "Previous single large shared round disk above both funnels; removed because the reference requires two independent upper connector structures."
  },
  {
    id: "top_black_center_block",
    displayName: "top black center block",
    category: "main_equipment_blockout",
    version: "v0.4",
    status: "draft_v0.4",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Simple black rectangular block on the top assembly; static visual mass only."
  },
  {
    id: "center_vessel_lid_stack",
    displayName: "center vessel lid stack",
    category: "main_equipment_blockout",
    version: "v0.4",
    status: "draft_v0.4",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_01_airflow_4_3_interval_0013.jpg"
    ],
    notes: "Layered top lid and short central standpipe for the single center vessel."
  },
  {
    id: "center_vessel_flange_ring",
    displayName: "center vessel flange ring",
    category: "main_equipment_blockout",
    version: "v0.4",
    status: "draft_v0.4",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_02_airflow_4_3_interval_0016.jpg"
    ],
    notes: "Coarse top flange ring around the center vessel lid."
  },
  {
    id: "center_vessel_clamp_blocks",
    displayName: "center vessel clamp blocks",
    category: "main_equipment_blockout",
    version: "v0.4",
    status: "draft_v0.4",
    referenceImages: [
      "01_reference_frames/B_center_equipment/B_center_03_airflow_4_3_interval_0022.jpg"
    ],
    notes: "Six coarse clamp blocks around the vessel top; no screw-level detail."
  },
  {
    id: "rear_white_disc",
    displayName: "rear white discs",
    category: "rear_wall_detail",
    version: "v0.5.x",
    status: "deprecated_no_display",
    referenceImages: [
      "01_reference_frames/D_rear_wall_top/D_rear_top_03_airflow_4_4_interval_0001.jpg"
    ],
    notes: "Deprecated after structure review: rear wall should not show white circular discs."
  },
  {
    id: "rear_right_corrugated_hose_blockout",
    displayName: "rear right corrugated hose blockout",
    category: "rear_wall_detail",
    version: "v0.5.x",
    status: "deprecated_no_display",
    referenceImages: [
      "01_reference_frames/D_rear_wall_top/D_rear_top_04_airflow_4_4_interval_0049.jpg"
    ],
    notes: "Deprecated after structure review to keep the rear wall visually clean."
  },
  {
    id: "workbench_perforation",
    displayName: "workbench perforation marks",
    category: "workbench_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/E_tools_small_parts/E_tools_05_original_frame_000009.jpg"
    ],
    notes: "Enhanced visible perforation marks focused on the middle/rear and right-side tabletop detail area."
  },
  {
    id: "small_static_parts",
    displayName: "small static parts set",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    childObjects: [
      "static_dish",
      "static_dish_lid",
      "blue_sterile_wrap",
      "small_metal_funnel_part",
      "loose_connector_part",
      "left_loose_clamp",
      "static_wrench_blockout"
    ],
    referenceImages: [
      "01_reference_frames/E_tools_small_parts/E_tools_01_image_补充1-卡箍.png",
      "01_reference_frames/E_tools_small_parts/E_tools_02_image-补充2-培养皿.png"
    ],
    notes: "Static tabletop detail set refined in v0.5; no hand, arm, tool motion, or tweezer action."
  },
  {
    id: "static_pad_disc",
    displayName: "static white pad disc",
    category: "small_static_detail",
    version: "v0.5",
    status: "removed_or_hidden_v0.5",
    referenceImages: [
      "01_reference_frames/E_tools_small_parts/E_tools_01_image_补充1-卡箍.png"
    ],
    notes: "Removed/hidden in v0.5 cleanup because the white disc appeared in front of the left loose clamp."
  },
  {
    id: "static_dish",
    displayName: "static dish",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/E_tools_small_parts/E_tools_02_image-补充2-培养皿.png"
    ],
    notes: "Moved to right rear perforated workbench area; includes amber/yellow medium for reference match."
  },
  {
    id: "static_dish_lid",
    displayName: "static dish lid",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/overview/image-补充2-培养皿.png"
    ],
    notes: "Transparent shallow lid/ring placed near the right rear dish."
  },
  {
    id: "blue_sterile_wrap",
    displayName: "blue sterile wrap",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/overview/image_补充1-卡箍.png",
      "01_reference_frames/overview/image-补充2-培养皿.png"
    ],
    notes: "Light blue translucent folded sheet under the metal loose parts on the center-right workbench."
  },
  {
    id: "small_metal_funnel_part",
    displayName: "small metal funnel part",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/overview/image_补充1-卡箍.png"
    ],
    notes: "Small tilted metal funnel/cup part resting on the blue sterile wrap."
  },
  {
    id: "loose_connector_part",
    displayName: "loose connector part",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/overview/image_补充1-卡箍.png"
    ],
    notes: "Small loose metal connector ring near the center-right loose part group."
  },
  {
    id: "left_loose_clamp",
    displayName: "left loose clamp",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/overview/image_补充1-卡箍.png"
    ],
    notes: "Metal clamp arc and lock block placed near the lower-left vessel flange/tabletop area."
  },
  {
    id: "static_wrench_blockout",
    displayName: "static wrench blockout",
    category: "small_static_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/E_tools_small_parts/E_tools_06_airflow_4_2_frame_000008.jpg"
    ],
    notes: "Slightly enlarged simplified static wrench on the far-right workbench stand."
  },
  {
    id: "airflow_mist_planes",
    displayName: "airflow mist planes",
    category: "atmosphere_detail",
    version: "v0.5",
    status: "final_draft_v0.5",
    referenceImages: [
      "01_reference_frames/D_rear_wall_top/D_rear_top_01_airflow_4_3_interval_0012.jpg"
    ],
    notes: "Opacity reduced in v0.5; static mist planes only, no particle system or complex shader."
  },
  {
    id: "left_lift_door_panel",
    displayName: "left lift door panel",
    category: "side_access_detail",
    version: "v0.5",
    status: "draft_v0.5",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Simplified translucent lift/transfer door panel attached to the left side wall."
  },
  {
    id: "right_lift_door_panel",
    displayName: "right lift door panel",
    category: "side_access_detail",
    version: "v0.5",
    status: "draft_v0.5",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg"
    ],
    notes: "Simplified translucent lift/transfer door panel attached to the right side wall."
  },
  {
    id: "left_lift_door_frame",
    displayName: "left lift door frame",
    category: "side_access_detail",
    version: "v0.5",
    status: "draft_v0.5",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Dark metal frame around the left side lift/transfer door."
  },
  {
    id: "right_lift_door_frame",
    displayName: "right lift door frame",
    category: "side_access_detail",
    version: "v0.5",
    status: "draft_v0.5",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg"
    ],
    notes: "Dark metal frame around the right side lift/transfer door."
  },
  {
    id: "left_lift_door_guide_rails",
    displayName: "left lift door guide rails",
    category: "side_access_detail",
    version: "v0.5",
    status: "draft_v0.5",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg"
    ],
    notes: "Pair of vertical guide rails for the left lift/transfer door; static only."
  },
  {
    id: "right_lift_door_guide_rails",
    displayName: "right lift door guide rails",
    category: "side_access_detail",
    version: "v0.5",
    status: "draft_v0.5",
    referenceImages: [
      "01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg"
    ],
    notes: "Pair of vertical guide rails for the right lift/transfer door; static only."
  }
];

export function getRegistryById(id) {
  return objectRegistry.find((entry) => entry.id === id);
}
