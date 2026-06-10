# 参考素材清单

## 说明

本文件登记所有参考视频和截图素材。素材按区域分类存放于 `01_reference_frames/` 目录。

## 素材组织结构（v0.1.5 确立）

```
01_reference_frames/
├── overview/                          # 📦 原始抽帧池（只读，不移动、不删除）
│   ├── 原视频/                        #    79 帧（frame_000001 ~ 000079）
│   ├── 分装间-RABS602B气流流型4-1.../  #     5 帧（静态气流流型）
│   ├── 分装间-RABS602B气流流型4-2.../  #    14 帧（动态气流流型1）
│   ├── image_补充1-卡箍.png           #     1 张补充图
│   └── image-补充2-培养皿.png         #     1 张补充图
├── A_overall/              # ✅ 精选：舱体整体图（从 overview 复制）
├── B_center_equipment/     # ✅ 精选：中央漏斗/罐体（从 overview 复制）
├── C_right_equipment/      # ✅ 精选：右侧设备（从 overview 复制）
├── D_rear_wall_top/        # ✅ 精选：后壁/顶部/管路（从 overview 复制）
└── E_tools_small_parts/    # ✅ 精选：垫片、工具、小零件（从 overview 复制）
```

### 关键规则

1. **overview/ 是原始抽帧池**：所有抽帧原始文件保留在此，不移动、不删除
2. **A~E 是精选参考图目录**：从 overview 中复制关键帧到对应分类
3. **只复制，不剪切**：确保原始素材完整可回溯
4. **文件名保留来源**：精选图文件名格式 `{来源视频}_{原始帧号}_{描述}.jpg`，可追溯到原始位置
5. **v0.2 建模优先用 A~E**：建模时优先参考 A~E 精选图，不遍历 overview/ 全部图片
6. **不强制每个候选帧都复制**：仅复制可清晰展示对应区域结构和比例的帧
7. **复制前须在 reference_selection_todo.md 登记**：确保筛选决策可追溯

---

## 视频素材

存放路径：`00_source_videos/`

| # | 文件名 | 大小 | 时长 | 抽帧状态 | 覆盖区域 | 登记日期 | 备注 |
|---|--------|------|------|----------|----------|----------|------|
| 1 | 原视频.mp4 | 62.1 MB | 6分31秒 | ✅ 79帧 | 整体/多区域 | 2026-06-10 | 主要参考源 |
| 2 | 分装间-RABS602B气流流型4-1（RABS602B静态气流流型1）.mp4 | 3.7 MB | 21秒 | ✅ 5帧 | 整体静态 | 2026-06-10 | 静态气流 |
| 3 | 分装间-RABS602B气流流型4-2（RABS602B动态气流流型1）.mp4 | 11.2 MB | 1分5秒 | ✅ 14帧 | 整体动态 | 2026-06-10 | 动态气流 |
| 4 | 分装间-RABS602B气流流型4-3（RABS602B动态气流流型2）.mp4 | 46 MB | 7分16秒 | ✅ 55帧 | 中央漏斗/右侧设备/顶部管路 | 2026-06-10 | v0.1.6 补充抽帧：44 interval + 11 scene |
| 5 | 分装间-RABS602B气流流型4-4（RABS602B动态气流流型3）.mp4 | 55 MB | 8分45秒 | ✅ 56帧 | 中央漏斗/右侧设备/标题卡 | 2026-06-10 | v0.1.6 补充抽帧：52 interval + 4 scene |

> **素材状态**：5 个视频，合计约 178 MB，总时长约 24 分钟。v0.1.6 后 5 个视频均已抽帧；`overview/` 当前递归统计 211 张图片（含旧 contact sheet 图片和 2 张补充图）。

---

## 截图素材登记

### overview/ — 原始抽帧池（v0.1.5）

| 来源 | 帧数 | 内容简述 |
|------|------|----------|
| 原视频/frame_000001 ~ 000079 | 79 | 原视频逐帧，覆盖多角度舱体内部 |
| 气流流型4-1/frame_000001 ~ 000005 | 5 | 静态气流流型整体 |
| 气流流型4-2/frame_000001 ~ 000014 | 14 | 动态气流流型整体 |
| airflow_4_3_interval_0001 ~ 0044 | 44 | 视频 4-3 每 10 秒固定间隔抽帧 |
| airflow_4_3_scene_0001 ~ 0011 | 11 | 视频 4-3 scene detect 抽帧（阈值 0.10） |
| airflow_4_4_interval_0001 ~ 0052 | 52 | 视频 4-4 每 10 秒固定间隔抽帧 |
| airflow_4_4_scene_0001 ~ 0004 | 4 | 视频 4-4 scene detect 抽帧（阈值 0.10，含标题卡） |
| image_补充1-卡箍.png | 1 | 卡箍特写 |
| image-补充2-培养皿.png | 1 | 培养皿特写 |
| **合计** | **211** | |

---

### A_overall（舱体整体图）

> 从 overview 精选复制。用于确认舱体比例和空间关系。

| 文件名 | 分辨率 | 视角描述 | 来源 | 登记日期 | 备注 |
|--------|--------|----------|------|----------|------|
| A_overall_01_airflow_4_1_frame_000001.jpg | 原分辨率 | 舱体整体、双漏斗、手套口、两侧管路 | 气流 4-1/frame_000001 | 2026-06-10 | v0.1.8 已确认 |
| A_overall_02_airflow_4_1_frame_000003.jpg | 原分辨率 | 正面整体、中央双漏斗和右侧软管 | 气流 4-1/frame_000003 | 2026-06-10 | v0.1.8 已确认 |
| A_overall_03_original_frame_000004.jpg | 原分辨率 | 中央设备与右侧区域整体关系 | 原视频/frame_000004 | 2026-06-10 | v0.1.8 已确认 |
| A_overall_04_original_frame_000057.jpg | 原分辨率 | 工作状态整体参考 | 原视频/frame_000057 | 2026-06-10 | v0.1.8 已确认 |

### B_center_equipment（中央漏斗/罐体）

> 从 overview 精选复制。用于中央漏斗、罐体建模。

| 文件名 | 分辨率 | 视角描述 | 来源 | 登记日期 | 备注 |
|--------|--------|----------|------|----------|------|
| B_center_01_airflow_4_3_interval_0013.jpg | 原分辨率 | 双漏斗下端、透明弯管和中央罐体上部 | airflow_4_3_interval_0013 | 2026-06-10 | v0.1.8 已确认 |
| B_center_02_airflow_4_3_interval_0016.jpg | 原分辨率 | 中央下料锥、透明管、右侧黑色旋钮同屏 | airflow_4_3_interval_0016 | 2026-06-10 | v0.1.8 已确认 |
| B_center_03_airflow_4_3_interval_0022.jpg | 原分辨率 | 中央罐体、弯管、卡箍区域 | airflow_4_3_interval_0022 | 2026-06-10 | v0.1.8 已确认 |
| B_center_04_airflow_4_4_interval_0008.jpg | 原分辨率 | 中央罐体与右侧黑色旋钮位置 | airflow_4_4_interval_0008 | 2026-06-10 | v0.1.8 已确认 |
| B_center_05_airflow_4_4_interval_0050.jpg | 原分辨率 | 中央锥形漏斗轮廓 | airflow_4_4_interval_0050 | 2026-06-10 | v0.1.8 已确认 |
| B_center_06_airflow_4_1_frame_000004.jpg | 原分辨率 | 静态双漏斗和下方圆形接口 | 气流 4-1/frame_000004 | 2026-06-10 | v0.1.8 已确认 |
| B_center_07_original_frame_000005.jpg | 原分辨率 | 中央大罐体上部和周边管路 | 原视频/frame_000005 | 2026-06-10 | v0.1.8 已确认 |

### C_right_equipment（右侧设备）

> 从 overview 精选复制。用于右侧罐体及设备建模。

| 文件名 | 分辨率 | 视角描述 | 来源 | 登记日期 | 备注 |
|--------|--------|----------|------|----------|------|
| C_right_01_airflow_4_3_interval_0001.jpg | 原分辨率 | 右侧黑色旋钮/电机样部件与接口 | airflow_4_3_interval_0001 | 2026-06-10 | v0.1.8 已确认 |
| C_right_02_airflow_4_3_interval_0005.jpg | 原分辨率 | 黑色旋钮、金属法兰、白色管路 | airflow_4_3_interval_0005 | 2026-06-10 | v0.1.8 已确认 |
| C_right_03_airflow_4_3_interval_0024.jpg | 原分辨率 | 右侧黑色部件和中央罐体 | airflow_4_3_interval_0024 | 2026-06-10 | v0.1.8 已确认 |
| C_right_04_airflow_4_4_interval_0013.jpg | 原分辨率 | 黑色旋钮与周边金属接口 | airflow_4_4_interval_0013 | 2026-06-10 | v0.1.8 已确认 |
| C_right_05_airflow_4_2_frame_000004.jpg | 原分辨率 | 4-2 右侧罐体与软管补充 | 气流 4-2/frame_000004 | 2026-06-10 | F4 转入 C |
| C_right_06_airflow_4_2_frame_000011.jpg | 原分辨率 | 4-2 右侧罐体无遮挡补充 | 气流 4-2/frame_000011 | 2026-06-10 | F11 转入 C |
| C_right_07_airflow_4_2_frame_000013.jpg | 原分辨率 | 4-2 右侧罐体、软管、接口关系补充 | 气流 4-2/frame_000013 | 2026-06-10 | F13 转入 C |

### D_rear_wall_top（后壁/顶部/管路）

> 从 overview 精选复制。用于后壁端口、管路系统建模。

| 文件名 | 分辨率 | 视角描述 | 来源 | 登记日期 | 备注 |
|--------|--------|----------|------|----------|------|
| D_rear_top_01_airflow_4_3_interval_0012.jpg | 原分辨率 | 顶部接口关系 | airflow_4_3_interval_0012 | 2026-06-10 | v0.1.8 已确认 |
| D_rear_top_02_airflow_4_3_interval_0019.jpg | 原分辨率 | 后壁、透明弯管、白色软管 | airflow_4_3_interval_0019 | 2026-06-10 | v0.1.8 已确认 |
| D_rear_top_03_airflow_4_4_interval_0001.jpg | 原分辨率 | 后壁和透明弯管，顶部漏斗下缘 | airflow_4_4_interval_0001 | 2026-06-10 | v0.1.8 已确认 |
| D_rear_top_04_airflow_4_4_interval_0049.jpg | 原分辨率 | 顶部横向管路与中央弯管关系 | airflow_4_4_interval_0049 | 2026-06-10 | v0.1.8 已确认 |
| D_rear_top_05_original_frame_000015.jpg | 原分辨率 | 后壁顶部高度参考 | 原视频/frame_000015 | 2026-06-10 | v0.1.8 已确认 |
| D_rear_top_06_original_frame_000066.jpg | 原分辨率 | 上部管路与手套操作范围 | 原视频/frame_000066 | 2026-06-10 | v0.1.8 已确认 |

### E_tools_small_parts（垫片、工具、小零件）

> 从 overview 精选复制。用于卡箍、垫片、工具等小零件建模。

| 文件名 | 分辨率 | 视角描述 | 来源 | 登记日期 | 备注 |
|--------|--------|----------|------|----------|------|
| E_tools_01_supplement_clamp.png | 原分辨率 | 卡箍/小零件特写 | image_补充1-卡箍.png | 2026-06-10 | v0.1.8 已确认 |
| E_tools_02_supplement_dish.png | 原分辨率 | 培养皿/小工具区域特写 | image-补充2-培养皿.png | 2026-06-10 | v0.1.8 已确认 |
| E_tools_03_airflow_4_3_interval_0015.jpg | 原分辨率 | 法兰和卡箍附近细节 | airflow_4_3_interval_0015 | 2026-06-10 | v0.1.8 已确认 |
| E_tools_04_airflow_4_3_interval_0017.jpg | 原分辨率 | 操作手、透明管和接口小件 | airflow_4_3_interval_0017 | 2026-06-10 | v0.1.8 已确认 |
| E_tools_05_original_frame_000009.jpg | 原分辨率 | 托盘/垫片/散件区域 | 原视频/frame_000009 | 2026-06-10 | v0.1.8 已确认 |
| E_tools_06_airflow_4_2_frame_000008.jpg | 原分辨率 | 4-2 小接口与右侧罐体补充 | 气流 4-2/frame_000008 | 2026-06-10 | F8 转入 E |

---

## 辅助浏览工具

- **Contact Sheets v0.1.5**：`04_outputs/contact_sheets/contact_sheet_01.jpg ~ 04.jpg`（4 张，每张 25 帧，保留旧输出）
- **Contact Sheets v0.1.6**：`04_outputs/contact_sheets/v0_1_6/contact_sheet_v0_1_6_01.jpg ~ 09.jpg`（9 张，覆盖全部 211 张）
- **HTML Gallery**：`04_outputs/reference_gallery/index.html`（浏览器打开即可浏览全部 211 张，支持来源筛选和点击放大）
- **筛选清单**：`03_docs/reference_selection_todo.md`
- **预筛建议**：`03_docs/reference_preselection.md`
- **Review Boards v0.1.7**：`04_outputs/review_boards/v0_1_7/`（A~E 五类评审板 + F 气流 4-2 补充评审板）
- **最终筛选草案模板**：`03_docs/final_reference_selection_draft.md`

## v0.1.6 抽帧与质量备注

- 新增抽帧总数：111 张。
- 固定间隔抽帧：每 10 秒 1 帧，视频 4-3 得到 44 张，视频 4-4 得到 52 张。
- scene detect：已执行。阈值 0.25 成功运行但无检出；降低到 0.10 后，视频 4-3 得到 11 张，视频 4-4 得到 4 张。
- 重复/低价值帧：4-3、4-4 存在多段近似重复角度；4-4 scene 中有 2 张标题卡；旧 `contact_sheet.jpg` 图片不建议作为建模参考；原视频后段部分帧有烟雾和人员遮挡。
- A/B/C/D/E 精选目录：截至 v0.1.6 更新后仍为空，等待人工确认后复制。

## v0.1.7 评审板登记

| 评审板 | 候选数量 | 输出文件 | 备注 |
|---|---:|---|---|
| A_overall | 6 | `04_outputs/review_boards/v0_1_7/A_overall_review_board.jpg` | 来自 `reference_preselection.md` |
| B_center_equipment | 10 | `04_outputs/review_boards/v0_1_7/B_center_equipment_review_board.jpg` | 来自 `reference_preselection.md` |
| C_right_equipment | 6 | `04_outputs/review_boards/v0_1_7/C_right_equipment_review_board.jpg` | 来自 `reference_preselection.md` |
| D_rear_wall_top | 8 | `04_outputs/review_boards/v0_1_7/D_rear_wall_top_review_board.jpg` | 来自 `reference_preselection.md` |
| E_tools_small_parts | 6 | `04_outputs/review_boards/v0_1_7/E_tools_small_parts_review_board.jpg` | 来自 `reference_preselection.md` |
| F_airflow_4_2_supplement | 13 | `04_outputs/review_boards/v0_1_7/F_airflow_4_2_supplement_review_board.jpg` | 4-2 补充候选，不是最终入选 |

备注：
- 气流 4-2 目录实际存在 13 张 `frame_*.jpg` 帧图，另有 1 张旧 `contact_sheet.jpg`；v0.1.7 只将 13 张实际帧图纳入 F 补充评审板。
- A/B/C/D/E 精选目录截至 v0.1.7 仍为空。
- `02_threejs/` 未修改，本阶段仍未进入建模。

## v0.1.8 最终参考图确认

| 分类目录 | 最终数量 | 说明 |
|---|---:|---|
| `01_reference_frames/A_overall/` | 4 | 舱体整体图 |
| `01_reference_frames/B_center_equipment/` | 7 | 中央漏斗/罐体 |
| `01_reference_frames/C_right_equipment/` | 7 | 右侧设备，含 F4/F11/F13 转入 |
| `01_reference_frames/D_rear_wall_top/` | 6 | 后壁/顶部/管路 |
| `01_reference_frames/E_tools_small_parts/` | 6 | 小零件，含 F8 转入 |
| **合计** | **30** | 最终精选参考图 |

v0.1.8 执行结果：
- 已根据人工视觉确认结果完成 30 张参考图复制。
- 仅复制，不移动；`overview/` 原始图片数量保持 211 张。
- 未入选候选图未复制；未入选原因记录在 `03_docs/final_reference_selection_draft.md`。
- 未创建 F 目录；F4、F11、F13 转入 C_right_equipment，F8 转入 E_tools_small_parts。
- `02_threejs/` 未修改，未建模，未创建 Three.js 场景。
- v0.1.8 完成后，可以进入 v0.2 舱体基础建模准备。

## v0.2 参考图使用记录

v0.2 建模主要使用 A_overall 整体参考图来校准舱体比例、前玻璃、手套孔和工作台位置：

| 用途 | 主要参考图 |
|---|---|
| 舱体整体比例 | `01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg` |
| 正面手套孔横向关系 | `01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg` |
| 中央空间和右侧区域关系 | `01_reference_frames/A_overall/A_overall_03_original_frame_000004.jpg` |
| 工作状态整体参考 | `01_reference_frames/A_overall/A_overall_04_original_frame_000057.jpg` |

次要参考：
- `01_reference_frames/D_rear_wall_top/` 用于后壁/顶部基础位置校验。
- `01_reference_frames/E_tools_small_parts/E_tools_05_original_frame_000009.jpg` 用于工作台面高度和台面感觉校验。

v0.2 明确未创建内部生产仪器；B/C/E 中设备、小件参考只登记为后续阶段素材，不在 v0.2 场景中建模。

## 最后更新

2026-06-10（v0.2 RABS 舱体基础结构 Three.js 建模）
