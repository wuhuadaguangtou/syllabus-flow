# SyllabusFlow 开发计划与时间表

> 项目目标：在 6 周内完成一个可演示、可部署、可测试，并适合用于求职面试的课程信息与学习计划项目。

## 1. 计划概览

- 开始日期：2026 年 9 月 2 日
- 目标完成日期：2026 年 10 月 13 日
- 总周期：6 周
- 建议投入：工作日每天约 2 小时，周末每天约 3～4 小时
- 预计总投入：约 95～120 小时
- 当前目标：优先完成 MVP，不在第一版中加入 RAG 或模型微调
- 第一版学校范围：悉尼大学（USYD），只读取无需登录的公开课程页面

最终需要形成的主要使用流程：

```text
输入 USYD 课程代码 ─→ 读取公开 Unit / Outline 页面 ─┐
                                                    ├→ 用户检查并修改结果
上传课程 PDF ──────→ 提取文本并由 AI 结构化 ────────┘
                                                             ↓
                                                保存课程与 Assessment
                                                             ↓
                                                生成学习任务和时间计划
                                                             ↓
                                                查看和更新任务状态
```

课程代码导入和 PDF 上传是两种并列入口。官方网页字段采用确定性解析；PDF 文本才进入 AI 结构化提取流程。两条路径最终使用同一组 Pydantic Schema、确认页面和数据库模型。

## 2. 当前完成情况

- [x] 创建 GitHub 仓库
- [x] 创建本地 Git 仓库
- [x] 完成项目 README 初稿
- [x] 初始化 FastAPI 后端骨架
- [x] 初始化 React + TypeScript + Vite 前端骨架
- [x] 添加 pytest、Ruff 和 GitHub Actions
- [x] 添加 Docker Compose 与 PostgreSQL 配置
- [x] 安装 Python 3.12
- [x] 安装并配置 VS Code
- [x] 在项目目录创建 `.venv`
- [x] 安装项目依赖
- [x] 在项目目录运行测试
- [x] 确定悉尼大学为第一版官方课程数据源
- [ ] 安装 Docker Desktop
- [ ] 完成数据库模型和迁移
- [ ] 完成 USYD 课程代码查询与 Unit Outline 导入
- [ ] 完成 PDF 上传与文本提取
- [ ] 完成 AI 结构化信息提取
- [ ] 完成学习计划生成
- [ ] 完成部署和项目演示

## 3. 每周里程碑

| 周期 | 时间 | 核心任务 | 完成标志 |
|---|---|---|---|
| 第 1 周 | 9 月 2 日—9 月 8 日 | 环境、项目运行、数据库基础 | 前后端可运行，数据库可读写 |
| 第 2 周 | 9 月 9 日—9 月 15 日 | USYD 课程导入、PDF 上传与解析 | 输入课程代码或上传 PDF 均可形成待确认数据 |
| 第 3 周 | 9 月 16 日—9 月 22 日 | AI 结构化信息提取 | 能提取作业、考试和日期 |
| 第 4 周 | 9 月 23 日—9 月 29 日 | 学习计划与任务管理 | 能生成、修改和保存学习任务 |
| 第 5 周 | 9 月 30 日—10 月 6 日 | 测试、评估和稳定性 | 主要流程有测试和真实评估结果 |
| 第 6 周 | 10 月 7 日—10 月 13 日 | 部署、演示和面试材料 | 有在线演示、视频和项目讲解稿 |

## 4. 第 1 周：开发环境与项目基础

### 9 月 2 日：配置开发环境

预计时间：1～2 小时。

- [x] 安装 Python 3.12
- [x] 安装 VS Code
- [x] 安装 VS Code 的 Python 扩展
- [x] 使用 VS Code 打开 `D:\project\syllabus-flow`
- [x] 创建 `.venv` 虚拟环境
- [x] 安装依赖
- [x] 运行自动化测试

执行命令：

```powershell
cd D:\project\syllabus-flow

python -m venv .venv

.\.venv\Scripts\python.exe -m pip install --upgrade pip

.\.venv\Scripts\python.exe -m pip install -e ".[dev]"

cd frontend
npm install

Set-Location ..
.\.venv\Scripts\python.exe -m pytest
```

完成标准：

- `python --version` 显示 Python 3.12
- pytest 显示 `3 passed`
- VS Code 选择 `.venv\Scripts\python.exe` 作为解释器

### 9 月 3 日：运行并理解前后端

预计时间：2 小时。

- [x] 启动 FastAPI 后端
- [x] 打开 Swagger API 文档
- [x] 启动 React 前端
- [x] 从前端调用后端健康检查接口
- [ ] 阅读前端和后端入口文件

启动后端：

```powershell
.\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --reload
```

打开：

```text
http://127.0.0.1:8000/docs
```

在另一个终端启动前端：

```powershell
cd frontend
npm run dev
```

完成标准：前端和后端都能打开，前端健康检查显示 API 正常。

### 9 月 4 日：理解项目架构

预计时间：2 小时。

- [ ] 阅读 `backend/app/main.py`
- [ ] 阅读 `backend/app/api/`
- [ ] 阅读 `backend/app/core/config.py`
- [ ] 阅读 `frontend/src/App.tsx`
- [ ] 阅读 `frontend/src/api.ts`
- [ ] 阅读 `tests/`
- [ ] 阅读 `docker-compose.yml`
- [ ] 画出一次前端请求经过后端再返回结果的流程

完成标准：能够不用看文档，口头解释每个主要目录的职责。

### 9 月 5 日：数据库设计

预计时间：2～3 小时。

- [ ] 确定第一版数据表
- [ ] 设计 `courses` 表
- [ ] 设计 `documents` 表
- [ ] 设计 `assessments` 表
- [ ] 设计 `study_tasks` 表
- [ ] 为课程加入 `provider`、`source_type`、`source_url`、学年、学期和获取时间
- [ ] 为 Assessment 保留来源 URL、原始文本和用户确认状态
- [ ] 明确数据表之间的关系

第一版暂时不实现复杂用户权限，可以先按单用户项目完成。

### 9 月 6 日：安装并启动数据库

预计时间：3～4 小时。

- [ ] 安装 Docker Desktop
- [ ] 运行 PostgreSQL 容器
- [ ] 配置 `.env`
- [ ] 测试后端数据库连接
- [ ] 确认数据库数据可以持久保存

完成标准：后端能够成功连接 PostgreSQL。

### 9 月 7 日：数据库模型与迁移

预计时间：3 小时。

- [ ] 添加 SQLAlchemy 模型
- [ ] 添加数据库 Session 管理
- [ ] 添加 Alembic
- [ ] 创建第一次数据库迁移
- [ ] 编写数据库连接测试

完成标准：执行迁移后能在数据库中看到第一版数据表。

### 9 月 8 日：课程 CRUD

预计时间：3～4 小时。

- [ ] 创建课程
- [ ] 查询课程列表
- [ ] 查询课程详情
- [ ] 修改课程
- [ ] 删除课程
- [ ] 添加接口测试
- [ ] 提交本周代码

建议提交信息：

```powershell
git add .
git commit -m "feat: add course management"
git push
```

## 5. 第 2 周：USYD 课程导入与 PDF 解析

### 9 月 9 日：USYD 数据源与统一 Schema

预计时间：2～3 小时。

- [ ] 定义统一的课程、学期、Assessment 和来源 Schema
- [ ] 设计 `USYDProvider` 服务边界
- [ ] 校验并规范化 `INFO1110` 形式的课程代码
- [ ] 只允许请求 `www.sydney.edu.au` 域名
- [ ] 设置请求超时、User-Agent 和错误类型

完成标准：课程代码导入和 PDF 导入能够输出相同结构的数据。

### 9 月 10 日：Unit of Study 页面解析

预计时间：3～4 小时。

- [ ] 使用 HTTPX 读取公开的 `/units/{UNIT_CODE}` 页面
- [ ] 使用 Beautiful Soup 提取课程名称、简介、学分和课程规则
- [ ] 提取当前年份、可用学期、地点及 Unit Outline 链接
- [ ] 保存官方来源 URL 和获取时间
- [ ] 使用本地 HTML fixture 编写解析器单元测试

完成标准：输入 `INFO1110` 后返回课程基本信息和可选择的 2026 Unit Outline，不需要 AI。

### 9 月 11 日：Unit Outline 与前端确认

预计时间：3～4 小时。

- [ ] 解析 assessment 名称、类型、占比、due date 和 AI 使用规则
- [ ] 解析 census date 和每周安排
- [ ] 添加课程代码输入框和查询状态
- [ ] 让用户选择具体学期并预览结果
- [ ] 显示官方来源链接
- [ ] 用户确认后再写入数据库
- [ ] 处理课程不存在、Outline 未发布、网页变化、超时和重复导入

完成标准：输入 USYD 课程代码、选择学期后，可以看到来自官方页面的待确认课程和 Assessment；系统不猜测缺失日期。

建议提交信息：

```text
feat: import University of Sydney unit outlines
```

### 9 月 12 日—9 月 15 日：PDF 上传与文本解析

- [ ] 实现 PDF 上传接口
- [ ] 限制文件类型为 PDF
- [ ] 设置文件大小限制
- [ ] 使用 PyMuPDF 提取文本
- [ ] 保存文件名称、大小、解析状态和来源类型
- [ ] 在前端显示上传进度
- [ ] 显示文本提取结果
- [ ] 处理空文件、损坏文件和扫描型 PDF
- [ ] 添加 PDF 上传与解析测试

完成标准：除了输入课程代码，用户也可以上传一份正常的课程大纲 PDF，系统能够显示提取文本并保存文档记录。

本周 PDF 路径只完成文本提取，不调用 AI。

建议提交信息：

```text
feat: add syllabus PDF upload and parsing
```

## 6. 第 3 周：AI 结构化信息提取

### 需要提取的信息

- 课程名称
- 课程代码
- 教师信息
- 学期信息
- 作业名称
- 作业截止日期
- 考试日期
- 评分占比
- 每周课程安排

### 本周任务

- [ ] 选择并配置一个大模型 API
- [ ] 设计结构化输出 Schema
- [ ] 使用 Pydantic 校验 AI 输出
- [ ] 设计并保存 Prompt 模板
- [ ] 统一日期格式
- [ ] 处理缺少字段的情况
- [ ] 处理 AI 返回非法 JSON 的情况
- [ ] 添加失败重试和超时
- [ ] 在保存前让用户确认和修改
- [ ] 记录调用耗时和错误原因

### 技术边界

AI 只处理用户上传的 PDF。悉尼大学公开页面使用确定性网页解析，不把官方字段交给模型猜测。

PDF 路径第一版使用以下方案即可：

```text
PDF 文本 + Prompt + 结构化 JSON 输出 + Pydantic 校验
```

第一版不需要：

- RAG
- 模型微调
- 向量检索
- 多智能体

### 完成标准

上传 PDF 后，能够生成一份可编辑的课程、作业和考试信息，并与 USYD 导入结果进入同一个确认页面。

建议提交信息：

```text
feat: extract structured syllabus data with AI
```

## 7. 第 4 周：学习计划与任务管理

### 本周任务

- [ ] 根据截止日期生成学习任务
- [ ] 将大作业拆分为多个阶段
- [ ] 计算任务优先级
- [ ] 设置预计学习时间
- [ ] 显示即将截止的任务
- [ ] 编辑任务
- [ ] 删除任务
- [ ] 标记任务完成
- [ ] 根据用户修改重新安排计划
- [ ] 添加对应测试

### 完成标准

完成以下完整流程：

```text
USYD 课程代码或 PDF → 提取信息 → 用户确认 → 生成计划 → 更新任务状态
```

建议提交信息：

```text
feat: generate and manage study plans
```

## 8. 第 5 周：测试、评估与稳定性

### 功能测试

- [ ] USYD 课程代码格式测试
- [ ] USYD Unit 页面解析 fixture 测试
- [ ] USYD Unit Outline 和 Assessment 解析测试
- [ ] 官方来源链接和获取时间测试
- [ ] PDF 上传测试
- [ ] PDF 解析测试
- [ ] 课程 CRUD 测试
- [ ] AI 输出校验测试
- [ ] 学习任务测试
- [ ] 前后端集成测试

### 错误处理

- [ ] USYD 课程不存在
- [ ] Unit Outline 尚未发布
- [ ] 同一课程存在多个学期或地点
- [ ] 官方页面超时或结构发生变化
- [ ] 重复导入同一课程和学期
- [ ] 空 PDF
- [ ] 损坏 PDF
- [ ] 扫描型 PDF
- [ ] 超大文件
- [ ] 重复上传
- [ ] AI 请求超时
- [ ] AI 输出字段缺失
- [ ] AI 返回错误日期
- [ ] 数据库连接失败

### AI 评估

准备 10～20 份不同格式的课程大纲，记录：

- [ ] 课程名称准确率
- [ ] 作业识别率
- [ ] 截止日期准确率
- [ ] 考试识别率
- [ ] 平均处理时间
- [ ] 单份 PDF 估算调用成本
- [ ] 失败案例及原因

### 完成标准

README 中能够展示真实的测试结果、准确率和已知限制。

建议提交信息：

```text
test: add extraction evaluation and integration tests
```

## 9. 第 6 周：部署与应聘材料

### 项目部署

- [ ] 选择部署平台
- [ ] 配置生产环境变量
- [ ] 部署后端
- [ ] 部署前端
- [ ] 部署数据库
- [ ] 验证线上完整流程
- [ ] 避免把 API Key 提交到 GitHub

### README 完善

- [ ] 添加项目截图
- [ ] 添加架构图
- [ ] 添加功能演示 GIF 或视频
- [ ] 添加本地运行步骤
- [ ] 添加技术栈说明
- [ ] 添加 AI 评估结果
- [ ] 添加 USYD 数据来源、解析限制和示例
- [ ] 添加已知限制
- [ ] 添加未来改进计划

### 应聘材料

- [ ] 录制 2～3 分钟演示视频
- [ ] 准备 30 秒项目介绍
- [ ] 准备 3 分钟详细介绍
- [ ] 准备项目难点和解决方案
- [ ] 准备技术选型说明
- [ ] 准备失败案例和改进方案
- [ ] 在简历中添加项目链接

### 完成标准

- GitHub 仓库结构清晰
- README 可以让陌生人独立运行项目
- 有可以访问的线上演示
- 有真实测试或评估数据
- 可以完整讲解项目架构和关键代码

## 10. 面试需要准备的问题

项目完成后，应当能够回答：

1. SyllabusFlow 解决了什么问题？
2. 为什么选择 FastAPI、React、TypeScript 和 Vite？
3. PDF 文本是怎样提取的？
4. 输入 USYD 课程代码后，系统怎样找到并解析官方 Unit Outline？
5. 如何处理网页结构变化、请求失败和 Outline 未发布？
6. 为什么官方网页解析不需要 AI，而 PDF 需要结构化提取？
7. 如何约束大模型返回固定 JSON？
8. AI 返回错误信息时如何处理？
9. 为什么第一版没有使用 RAG 或模型微调？
10. 如何评价 AI 提取结果是否准确？
11. 如何保证 Assessment 和截止日期可以追溯到来源？
12. 如何保护用户上传的文件和 API Key？
13. 如果用户量增加，系统架构应该如何升级？

## 11. 第一版不做的功能

为了按时完成，以下功能不进入第一版：

- RAG
- 模型微调
- 多智能体系统
- 复杂登录和权限系统
- 手机 App
- 社交和聊天功能
- 登录 Sydney Student、Canvas 或其他私有学校系统
- 支持悉尼大学以外的学校
- 多学校、多组织管理
- 复杂日历同步

这些功能可以写入 README 的 Future Work，但不要影响 MVP 完成时间。

## 12. 每天的工作方式

每次开始开发：

```powershell
cd D:\project\syllabus-flow
git status
```

开发过程中：

- 一次只完成一个小功能
- 修改后运行相关测试
- 不把密码、Token 或 API Key 写入代码
- 遇到错误时保存完整错误信息

每次结束开发：

```powershell
.\.venv\Scripts\python.exe -m ruff check .
.\.venv\Scripts\python.exe -m pytest
git status
```

功能真正完成后再提交：

```powershell
git add .
git commit -m "类型: 简短描述"
git push
```

建议的提交类型：

- `feat`：新功能
- `fix`：修复问题
- `test`：增加或修改测试
- `docs`：修改文档
- `refactor`：重构代码
- `chore`：环境和工具配置

## 13. 进度失控时的处理顺序

如果任务延期，按以下顺序缩减范围：

1. 先取消动画和界面美化。
2. 再取消非核心统计图表。
3. 再减少支持的 PDF 类型。
4. 保留 USYD 课程代码导入、PDF 上传、用户确认和任务生成两条主流程。
5. 不要为了加入 RAG 或微调而推迟 MVP。

判断项目是否完成的核心标准不是功能数量，而是主流程稳定、可以演示、可以解释、可以验证。
