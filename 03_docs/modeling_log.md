# 建模日志

## 格式说明

每条记录包含：
- **时间**：操作日期时间
- **类型**：init / material / model / modify / fix / freeze / review
- **区域**：受影响区域
- **对象 ID**：受影响对象（逗号分隔）
- **内容**：做了什么、为什么、影响范围
- **结果**：成功 / 部分 / 失败
- **下一步**：后续建议

---

## 记录

### [2026-06-10] v0.1 — 项目初始化

- **时间**：2026-06-10
- **类型**：init
- **区域**：全部（仅文档）
- **对象 ID**：无
- **内容**：
  1. 创建项目目录结构（00_source_videos ~ 05_archive）
  2. 初始化 Git 仓库
  3. 创建全部 7 个基础文档
  4. 定义 16 个初始对象 ID
  5. 建立统一坐标系
  6. 建立建模规则和验收标准
- **结果**：成功
- **下一步**：
  1. 导入参考素材到 `00_source_videos/` 和 `01_reference_frames/`
  2. 登记素材到 `reference_manifest.md`
  3. 开始 v0.2：舱体基础外壳建模

---

### [2026-06-10] v0.1.5 — 素材整理与主参考图筛选

- **时间**：2026-06-10
- **类型**：material
- **区域**：全部（仅素材和文档）
- **对象 ID**：无
- **内容**：
  1. 检查素材数量：
     - `00_source_videos/`：5 个 MP4 视频（见视频清单）
     - `01_reference_frames/overview/`：100 张图片（3 个子目录 + 2 张根目录图片）
  2. 创建输出目录：`04_outputs/contact_sheets/`、`04_outputs/reference_gallery/`
  3. 生成 4 张 contact sheet（每张 25 帧，共 100 帧），输出到 `04_outputs/contact_sheets/contact_sheet_01.jpg ~ 04.jpg`
  4. 生成 HTML 图片浏览页：`04_outputs/reference_gallery/index.html`，包含 100 张缩略图、文件名、相对路径、来源分组筛选
  5. 创建 `03_docs/reference_selection_todo.md`：人工筛选清单，A~E 五区各含空表格
  6. 更新 `03_docs/reference_manifest.md`：补充 v0.1.5 素材组织结构说明
  7. 更新 `03_docs/acceptance_checklist.md`：增加 v0.1.5 验收项
  8. 记录本条目（modeling_log.md）
- **发现的问题**：
  - ⚠️ **视频数量与预期一致**：实际 5 个视频，与项目预期匹配（之前以为只有 4 个，经核实为 5 个）
  - ⚠️ **A~E 分类目录为空**：所有抽帧仍在 `overview/` 中，尚未按区域分类
  - ⚠️ **动态气流流型视频 4-3 和 4-4 未抽帧**：overview 中只有视频 4-1 和 4-2 及原视频的抽帧，缺少 4-3、4-4 的抽帧
- **结果**：成功
- **下一步**：
  1. **人工**：打开 `04_outputs/reference_gallery/index.html` 浏览全部帧
  2. **人工**：按 `reference_selection_todo.md` 逐区域筛选精选帧
  3. **人工**：将精选帧复制到 A~E 目录（保留原始文件名前缀以溯源）
  4. **人工**：在 `reference_selection_todo.md` 中勾选已复制
  5. 可选：对视频 4-3、4-4 抽帧补充到 overview/

---

### [2026-06-10] v0.1.6 — 全量抽帧与参考素材总览更新

- **时间**：2026-06-10
- **类型**：material
- **区域**：全部（仅素材、输出和文档）
- **对象 ID**：无
- **内容**：
  1. 检查 `00_source_videos/`：共 5 个 MP4 视频。
     - 原视频：62M，391.03 秒
     - 气流 4-1：3.7M，20.61 秒
     - 气流 4-2：11M，65.28 秒
     - 气流 4-3：46M，436.33 秒
     - 气流 4-4：55M，524.85 秒
  2. 确认 v0.1.6 前 `overview/` 递归统计为 100 张图片，4-3、4-4 尚未抽帧。
  3. 确认 A/B/C/D/E 精选目录均为空，本轮未复制任何图片到精选目录。
  4. 对视频 4-3、4-4 执行每 10 秒 1 帧固定间隔抽帧：
     - `airflow_4_3_interval_0001.jpg ~ 0044.jpg`：44 张
     - `airflow_4_4_interval_0001.jpg ~ 0052.jpg`：52 张
  5. 执行 ffmpeg scene detect：
     - 阈值 0.25 成功运行但无检出
     - 阈值 0.10 生成 `airflow_4_3_scene_0001.jpg ~ 0011.jpg`：11 张
     - 阈值 0.10 生成 `airflow_4_4_scene_0001.jpg ~ 0004.jpg`：4 张
  6. 新增抽帧 111 张，`overview/` 当前递归统计为 211 张图片。
  7. 生成 v0.1.6 contact sheets：`04_outputs/contact_sheets/v0_1_6/contact_sheet_v0_1_6_01.jpg ~ 09.jpg`。
  8. 更新 HTML gallery：`04_outputs/reference_gallery/index.html`，覆盖全部 211 张，支持来源筛选、元数据展示和点击放大。
  9. 创建 `03_docs/reference_preselection.md`，提供 A/B/C/D/E 候选建议，不执行复制。
  10. 更新 `reference_manifest.md`、`reference_selection_todo.md`、`acceptance_checklist.md`。
- **发现的问题**：
  - 4-3、4-4 存在多段近似重复帧，人工筛选时每段保留少数清晰帧即可。
  - 4-4 scene 中有 2 张标题卡，记录信息有用但不建议作为建模参考。
  - 旧 `overview/*/contact_sheet.jpg` 仍在总览池内，作为历史输出保留，不建议复制到 A/B/C/D/E。
  - 原视频后段部分帧存在烟雾、人员遮挡或轻微模糊，需人工复核。
- **结果**：成功
- **下一步**：
  1. 人工打开 `04_outputs/reference_gallery/index.html` 按来源筛选查看。
  2. 人工复核 `03_docs/reference_preselection.md` 的候选列表。
  3. 人工确认后，将最终精选图复制到 A/B/C/D/E，并更新 `reference_selection_todo.md`。

---

### [2026-06-10] v0.1.7 — 人工视觉筛选评审板生成

- **时间**：2026-06-10
- **类型**：material
- **区域**：全部（仅评审输出和文档）
- **对象 ID**：无
- **内容**：
  1. 读取 `03_docs/reference_preselection.md`，提取 A/B/C/D/E 五类共 36 张候选图。
     - A_overall：6 张
     - B_center_equipment：10 张
     - C_right_equipment：6 张
     - D_rear_wall_top：8 张
     - E_tools_small_parts：6 张
  2. 针对 Claude 审查指出的 4-2 漏选问题，检查 `01_reference_frames/overview/分装间-RABS602B气流流型4-2（RABS602B动态气流流型1）/`。
  3. 实际找到 `frame_000001.jpg ~ frame_000013.jpg` 共 13 张气流 4-2 帧图，另有旧 `contact_sheet.jpg`；评审板仅纳入 13 张实际帧图，排除旧 contact sheet。
  4. 生成评审板到 `04_outputs/review_boards/v0_1_7/`：
     - `A_overall_review_board.jpg`
     - `B_center_equipment_review_board.jpg`
     - `C_right_equipment_review_board.jpg`
     - `D_rear_wall_top_review_board.jpg`
     - `E_tools_small_parts_review_board.jpg`
     - `F_airflow_4_2_supplement_review_board.jpg`
  5. 创建 `03_docs/final_reference_selection_draft.md`，作为人工最终筛选填写模板；未将候选标记为最终确认。
  6. 新增 `04_outputs/generate_v0_1_7_review_boards.py`，用于复现评审板生成。
- **发现的问题**：
  - 4-2 目录中实际帧图为 13 张，不是 14 张；旧 `contact_sheet.jpg` 不是单帧参考图，未纳入 F 补充候选。
  - 粗略视觉判断：4-2 的 F4、F8、F11、F13 可能较有补充价值，但仍需人工视觉确认。
  - A/B/C/D/E 精选目录仍为空。
  - `02_threejs/` 未修改；本轮未建模、未创建 Three.js 场景。
- **结果**：成功
- **下一步**：
  1. 将 `04_outputs/review_boards/v0_1_7/*.jpg` 上传给 ChatGPT 进行人工视觉筛选。
  2. 人工确认最终入选后，再填写 `03_docs/final_reference_selection_draft.md` 的确认列。
  3. 人工确认后才复制图片到 A/B/C/D/E。

---

### [2026-06-10] v0.1.8 — 最终参考图确认与复制

- **时间**：2026-06-10
- **类型**：material
- **区域**：全部（仅参考图复制和文档）
- **对象 ID**：无
- **内容**：
  1. 根据人工视觉确认结果，从 `01_reference_frames/overview/` 复制最终精选参考图到 A/B/C/D/E。
  2. 所有源文件均找到，无缺失。
  3. 最终复制 30 张：
     - A_overall：4 张
     - B_center_equipment：7 张
     - C_right_equipment：7 张
     - D_rear_wall_top：6 张
     - E_tools_small_parts：6 张
  4. F 区转入结果：
     - F4、F11、F13 转入 `C_right_equipment`
     - F8 转入 `E_tools_small_parts`
     - 未创建 F 目录
  5. 更新 `03_docs/final_reference_selection_draft.md`：标记已确认、记录复制后路径、记录未入选候选及原因。
  6. 更新 `reference_selection_todo.md`、`reference_manifest.md`、`acceptance_checklist.md`。
- **校验结果**：
  - `overview/` 原始图片仍为 211 张，未移动、未删除。
  - A/B/C/D/E 实际数量为 4/7/7/6/6。
  - 目标目录与人工入选清单完全匹配：缺失 0，额外 0。
  - 未复制未入选候选图。
  - `02_threejs/` 未修改；本轮未建模、未创建 Three.js 场景。
- **结果**：成功
- **下一步**：
  1. v0.1.8 已完成，可以进入 v0.2 舱体基础建模准备。
  2. v0.2 建模时优先使用 A/B/C/D/E 精选目录，不直接遍历 `overview/`。

---

### [2026-06-10] v0.2 — RABS 舱体基础结构 Three.js 建模

- **时间**：2026-06-10
- **类型**：model
- **区域**：舱体基础结构
- **对象 ID**：`chamber_shell`, `glass_panels`, `rear_wall`, `workbench`, `glove_ports`, `lights_camera`
- **内容**：
  1. 执行状态检查：
     - `02_threejs/` 初始为空。
     - A/B/C/D/E 精选参考图数量为 4/7/7/6/6。
     - 新增 `.gitignore`，排除原始视频、overview 抽帧池、大量输出目录、依赖和构建产物。
  2. 创建 Vite + Three.js 最小工程：
     - `02_threejs/index.html`
     - `02_threejs/package.json`
     - `02_threejs/src/main.js`
     - `02_threejs/src/styles.css`
     - `02_threejs/src/scene/*.js`
     - `02_threejs/src/ui/cameraButtons.js`
     - `02_threejs/README.md`
  3. 建立统一场景配置：`02_threejs/src/scene/scale.js` 中的 `SCENE_SCALE`。
  4. 创建 v0.2 允许对象：
     - `chamber_shell`：舱体基础不锈钢外框、立柱、侧向基础框架。
     - `glass_panels`：前玻璃面板，透明度较低，保留观察视线。
     - `rear_wall`：后壁不锈钢面板和轻微分块线。
     - `workbench`：底部不锈钢台面，带稀疏打孔标记。
     - `glove_ports`：前面板四个浅灰色手套孔/袖套口，附着在前玻璃平面。
     - `lights_camera`：环境光、顶部柔光、补光、OrbitControls 和固定机位。
  5. 创建固定机位：
     - `camera_overall_front`
     - `camera_front_straight`
     - `camera_table_view`
     - `camera_side_depth`
     - `camera_top_overview`
  6. 创建对象注册表：`02_threejs/src/scene/objectRegistry.js`，6 个对象均为 `draft_v0.2`。
  7. 输出固定机位截图到 `04_outputs/screenshots/v0_2/`。
- **使用参考图**：
  - 主要使用 A_overall：`A_overall_01_airflow_4_1_frame_000001.jpg`、`A_overall_02_airflow_4_1_frame_000003.jpg`、`A_overall_03_original_frame_000004.jpg`、`A_overall_04_original_frame_000057.jpg`。
  - 次要参考 D/E 中后壁、顶部、工作台相关图；仅用于基础比例，不建内部设备。
- **明确未创建**：
  - 未创建中央漏斗、中央罐体、右侧罐体、复杂管路、卡箍、培养皿、垫片、工具、烟雾气流。
- **验证**：
  - `npm install` 成功。
  - `npm run build` 成功。
  - 使用本机 Google Chrome + Playwright 生成 5 张截图，页面可运行。
  - 截图显示舱体、玻璃、后壁、工作台、手套孔可见，侧视可看出深度。
- **结果**：成功
- **下一步**：
  1. 进入 v0.2 review，先检查比例、手套孔位置、工作台高度、舱体深度。
  2. 不建议直接进入 v0.3；应先根据 review 微调基础结构。

---

### [2026-06-10] v0.2.1 — 手套孔结构修正

- **时间**：2026-06-10
- **类型**：modify
- **区域**：前面板 / 手套孔
- **对象 ID**：`glove_ports`
- **内容**：
  1. 人工视觉审查发现 v0.2 手套孔逻辑错误：
     - 不应区分主手套孔和辅助孔。
     - 不应有上方小孔或左右辅助孔。
     - 不应存在大小不同或不等距的孔位。
  2. 修改 `02_threejs/src/scene/scale.js`，将手套孔参数统一为：
     - 数量：4
     - 半径：0.55
     - 中心 Y：1.08
     - 中心 X：-3.3、-1.1、1.1、3.3
     - Z：`frontGlassZ + 0.06`
  3. 修改 `02_threejs/src/scene/glovePorts.js`：
     - 删除/停用主孔、辅助孔、上方小孔逻辑。
     - 生成 `glove_port_01`、`glove_port_02`、`glove_port_03`、`glove_port_04`。
     - 每个孔均由浅色 Torus 压环、浅色袖套口、前玻璃开口阴影组成。
  4. 修改 `02_threejs/src/scene/objectRegistry.js`：
     - `glove_ports` 状态更新为 `draft_v0.2.1`。
     - 登记子对象 `glove_port_01` 到 `glove_port_04`。
     - 备注记录人工审查修正原因。
  5. 更新 UI 版本显示为 `HB-RABS v0.2.1` / `v0.2.1 chamber base draft`。
  6. 重新生成固定机位截图到 `04_outputs/screenshots/v0_2_1/`。
- **验证**：
  - `npm run build` 成功。
  - 运行时 `glove_ports.userData.portLayout` 显示 4 个孔等半径、等高度、等间距、对称排布。
  - `camera_front_straight.png` 可清楚检查四孔等大、等高、等距。
- **明确未创建**：
  - 未创建中央漏斗、中央罐体、右侧罐体、管路、小工具、烟雾。
  - 未移动或改动 A/B/C/D/E 最终参考图目录。
  - 未进入 v0.3。
- **结果**：成功
- **下一步**：
  1. 进入 v0.2.1 视觉复核，重点查看 `04_outputs/screenshots/v0_2_1/camera_front_straight.png`。
  2. 复核通过后再决定是否进入 v0.3。

---

### [2026-06-10] v0.3 — 主要生产设备 blockout

- **时间**：2026-06-10
- **类型**：model
- **区域**：主要生产设备占位
- **对象 ID**：`center_funnel_pair`, `center_vessel`, `right_vessel`, `right_black_handwheel`, `main_tubing_blockout`, `rear_ports_blockout`
- **内容**：
  1. 新增主要设备 blockout 模块：
     - `02_threejs/src/scene/centerEquipment.js`
     - `02_threejs/src/scene/rightEquipment.js`
     - `02_threejs/src/scene/pipesBlockout.js`
     - `02_threejs/src/scene/rearPorts.js`
  2. 在 `main.js` 接入 6 个 v0.3 对象，并将页面版本更新为 `v0.3 equipment blockout draft`。
  3. 在 `objectRegistry.js` 登记新增对象，状态均为 `draft_v0.3`。
  4. 输出固定机位截图到 `04_outputs/screenshots/v0_3/`。
- **新增对象**：
  - `center_funnel_pair`：顶部双漏斗粗形体。
  - `center_vessel`：中央圆筒罐体、上盖、粗略层带。
  - `right_vessel`：右侧圆筒罐体与上盖。
  - `right_black_handwheel`：右侧黑色手轮和短连接件。
  - `main_tubing_blockout`：中央弯管、右侧横管、后壁/右侧软管粗走向。
  - `rear_ports_blockout`：后壁圆形接口占位。
- **明确未创建**：
  - 未创建小工具、垫片、培养皿、镊子、扳手、人物、手臂、烟雾、精细螺丝或真实软管细节。
  - 未修改 v0.2.1 手套孔布局。
- **验证**：
  - `npm run build` 成功。
  - 使用本机 Google Chrome + Playwright 生成 5 张 v0.3 截图。
- **结果**：成功
- **下一步**：
  1. 进入 v0.3 人工视觉复核。
  2. 重点复核中央设备是否过度遮挡手套孔、双漏斗大小是否偏大、右侧软管/右侧罐前后关系是否合理。

---

### [2026-06-10] v0.3.1 — 主要设备 blockout 结构纠偏

- **时间**：2026-06-10
- **类型**：model correction
- **区域**：主要生产设备占位 / 左右管路阀门
- **对象 ID**：`center_funnel_pair`, `center_vessel`, `right_vessel`, `left_horizontal_pipe_blockout`, `right_horizontal_pipe_blockout`, `left_black_handwheel`, `right_black_handwheel`, `right_pipe_couplings`, `left_white_hose_blockout`, `right_white_hose_blockout`, `main_tubing_blockout`
- **修正原因**：人工视觉审查指出 v0.3 将右侧结构误建为独立 `right_vessel`；真实参考关系应为黑色手轮安装在横向不锈钢管路上，并通过白色软管、灰色接头、法兰/卡箍与管路连接。
- **内容**：
  1. 从场景中删除/停用 `right_vessel`，并在 `objectRegistry.js` 标记为 `removed_or_deprecated_v0.3.1`。
  2. 重构左右横向阀门管线：新增左右横向管路、左右黑色手轮、左右白色软管，并保留右侧灰色接头/法兰占位。
  3. 保留 `center_vessel` 作为唯一主圆筒罐体，双漏斗仍位于中央罐体上方。
  4. 修正 `main_tubing_blockout`：左/右漏斗短颈分别通过弯管过渡到左/右横向阀门管线。
  5. 页面版本更新为 `v0.3.1 equipment blockout correction`。
  6. 输出固定机位截图到 `04_outputs/screenshots/v0_3_1/`。
- **明确未修改/未创建**：
  - 未修改 v0.2.1 四个等大、等高、等距手套孔。
  - 未创建小工具、垫片、培养皿、镊子、扳手、人物、手臂、烟雾或精细螺丝/真实软管细节。
- **验证**：
  - `npm run build` 成功。
  - Playwright 运行态检查确认场景对象中不包含 `right_vessel`，且 `right_vessel` 在注册表中为 `removed_or_deprecated_v0.3.1`。
  - 已生成 4 张 v0.3.1 固定机位截图。
- **结果**：成功
- **下一步**：
  1. 进入 v0.3.1 人工视觉复核。
  2. 重点复核左右黑色手轮是否确实位于横向管路上、左右白色软管走向是否合理、双漏斗下颈到左右管线的连接是否清楚。

---

### [2026-06-10] v0.4 — 主体设备完整化与展示质感提升

- 强化顶部总成、双漏斗、中央唯一主罐体、左右横向管路、黑色手轮叶片、白色软管环纹和后壁端口细节。
- 新增静态工作台小件、增强打孔、后壁白色圆片/右上软管、低透明雾片；均为静态展示对象。
- `right_vessel` 继续保持 `removed_or_deprecated_v0.3.1`，未重新显示。
- v0.2.1 四个等大、等高、等距手套孔未修改。
- 未添加人物、手臂、动作、复杂粒子烟雾或螺丝级精细结构。
- 已执行 `npm run build`；本轮按要求不自动截图、不运行 Playwright。

---

### [2026-06-10] v0.5 — 最终视觉纠偏与展示收尾

- 培养皿/透明盖移到右后打孔区，并增加淡黄色内容物。
- 新增蓝色无菌垫、躺放金属漏斗零件、松散接头和左侧金属卡箍。
- 放大右侧静态扳手与小方形台，增强中后/右侧工作台打孔。
- 顶部圆盘减薄，玻璃与雾片透明度调低；`right_vessel` 仍保持弃用。
- v0.2.1 四手套孔未修改；未添加人物、手臂、动作、粒子烟雾或螺丝级细节。
- 已执行 `npm run build`；本轮不自动截图、不运行 Playwright。

---

### [2026-06-10] v0.5 — 小件/侧门/管路收尾修正

- 删除左侧卡箍前方白色圆片，左侧金属卡箍左移并外露。
- 右后培养皿与透明盖分开放置，右后工具区整理为培养皿、蓝垫金属件、前侧扳手。
- 新增左右侧静态升降/传递小门：门板、框、导轨。
- 移除白色软管多余环纹，保留关键法兰、漏斗短颈卡箍和中央罐体卡箍。
- 手套孔和 `right_vessel` 状态未改；未添加人物、手臂、动作或粒子烟雾。

---

## 最后更新

2026-06-10
