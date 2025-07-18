import { useState } from "react";
import {
    Tab,
    ObjectType,
    tableFieldHeight,
    tableHeaderHeight,
    tableColorStripHeight,
} from "../../data/constants";
import {
    IconEdit,
    IconMore,
    IconMinus,
    IconDeleteStroked,
    IconKeyStroked,
} from "@douyinfe/semi-icons";
import { Popover, Tag, Button, Toast, SideSheet } from "@douyinfe/semi-ui";
import { useLayout, useSettings, useTables, useSelect } from "../../hooks";
import TableInfo from "../EditorSidePanel/TablesTab/TableInfo";

export default function Table(props) {

    const [hoveredField, setHoveredField] = useState(-1);

    const {
        tableData,
        onMouseDown,
        setHoveredTable,
        handleGripField,
        setLinkingLine,
    } = props;

    const { layout } = useLayout();

    const { deleteTable, deleteField } = useTables();

    const { settings } = useSettings();

    const { selectedElement, setSelectedElement } = useSelect();

    const height = tableData.fields.length * tableFieldHeight + tableHeaderHeight + 7;
    
    const openEditor = () => {
        if (!layout.sidebar) {
            setSelectedElement((prev) => ({
                ...prev,
                element: ObjectType.TABLE,
                id: tableData.id,
                open: true,
            }));
        } else {
            setSelectedElement((prev) => ({
                ...prev,
                currentTab: Tab.TABLES,
                element: ObjectType.TABLE,
                id: tableData.id,
                open: true,
            }));
            if (selectedElement.currentTab !== Tab.TABLES) return;
            document
                .getElementById(`scroll_table_${tableData.id}`)
                .scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <foreignObject
                key={tableData.id}
                x={tableData.x}
                y={tableData.y}
                width={settings.tableWidth}
                height={height}
                className="group drop-shadow-lg rounded-md cursor-move"
                onMouseDown={onMouseDown}
            >
                <div
                    onDoubleClick={openEditor}
                    className={`border-2 hover:border-dashed hover:border-blue-500
               select-none rounded-lg w-full ${
                   settings.mode === "light"
                       ? "bg-zinc-100 text-zinc-800"
                       : "bg-zinc-800 text-zinc-200"
               } ${
                   selectedElement.id === tableData.id &&
                   selectedElement.element === ObjectType.TABLE
                       ? "border-solid border-blue-500"
                       : "border-zinc-500"
               }`}
                >
                    <div
                        className="h-[10px] w-full rounded-t-md"
                        style={{ backgroundColor: tableData.color }}
                    />
                    <div
                        className={`overflow-hidden font-bold h-[40px] flex justify-between items-center border-b border-gray-400 ${
                            settings.mode === "light"
                                ? "bg-zinc-200"
                                : "bg-zinc-900"
                        }`}
                    >
                        <div className=" px-3 overflow-hidden text-ellipsis whitespace-nowrap">
                            {tableData.name}
                        </div>
                        <div className="hidden group-hover:block">
                            <div className="flex justify-end items-center mx-2">
                                <Button
                                    icon={<IconEdit />}
                                    size="small"
                                    theme="solid"
                                    style={{
                                        backgroundColor: "#2f68adb3",
                                        marginRight: "6px",
                                    }}
                                    onClick={openEditor}
                                />
                                <Popover
                                    key={tableData.key}
                                    content={
                                        <div className="popover-theme">
                                            <div className="mb-2">
                                                <strong>Comment :</strong>{" "}
                                                {tableData.comment === "" ? (
                                                    "No comment"
                                                ) : (
                                                    <div>
                                                        {tableData.comment}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <strong
                                                    className={`${
                                                        tableData.indices
                                                            .length === 0
                                                            ? ""
                                                            : "block"
                                                    }`}
                                                >
                                                    Indices :
                                                </strong>{" "}
                                                {tableData.indices.length ===
                                                0 ? (
                                                    "No indices"
                                                ) : (
                                                    <div>
                                                        {tableData.indices.map(
                                                            (index, k) => (
                                                                <div
                                                                    key={k}
                                                                    className={`flex items-center my-1 px-2 py-1 rounded ${
                                                                        settings.mode ===
                                                                        "light"
                                                                            ? "bg-gray-100"
                                                                            : "bg-zinc-800"
                                                                    }`}
                                                                >
                                                                    <i className="fa-solid fa-thumbtack me-2 mt-1 text-slate-500"></i>
                                                                    <div>
                                                                        {index.fields.map(
                                                                            (
                                                                                f,
                                                                            ) => (
                                                                                <Tag
                                                                                    color="blue"
                                                                                    key={
                                                                                        f
                                                                                    }
                                                                                    className="me-1"
                                                                                >
                                                                                    {
                                                                                        f
                                                                                    }
                                                                                </Tag>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                icon={<IconDeleteStroked />}
                                                type="danger"
                                                block
                                                style={{ marginTop: "8px" }}
                                                onClick={() => {
                                                    Toast.success(
                                                        `Table deleted!`,
                                                    );
                                                    deleteTable(tableData.id);
                                                }}
                                            >
                                                Delete table
                                            </Button>
                                        </div>
                                    }
                                    position="rightTop"
                                    showArrow
                                    trigger="click"
                                    style={{
                                        width: "200px",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    <Button
                                        icon={<IconMore />}
                                        type="tertiary"
                                        size="small"
                                        style={{
                                            backgroundColor: "#808080b3",
                                            color: "white",
                                        }}
                                    />
                                </Popover>
                            </div>
                        </div>
                    </div>
                    {tableData.fields.map((e, i) => {
                        return settings.showFieldSummary ? (
                            <Popover
                                key={i}
                                content={
                                    <div className="popover-theme">
                                        <div className="flex justify-between items-center pb-2">
                                            <p className="me-4 font-bold">
                                                {e.name}
                                            </p>
                                            <p className="ms-4">{e.type}</p>
                                        </div>
                                        <hr />
                                        {e.primary && (
                                            <Tag
                                                color="blue"
                                                className="me-2 my-2"
                                            >
                                                Primary
                                            </Tag>
                                        )}
                                        {e.unique && (
                                            <Tag
                                                color="amber"
                                                className="me-2 my-2"
                                            >
                                                Unique
                                            </Tag>
                                        )}
                                        {e.notNull && (
                                            <Tag
                                                color="purple"
                                                className="me-2 my-2"
                                            >
                                                Not null
                                            </Tag>
                                        )}
                                        {e.increment && (
                                            <Tag
                                                color="green"
                                                className="me-2 my-2"
                                            >
                                                Increment
                                            </Tag>
                                        )}
                                        <p>
                                            <strong>Default: </strong>
                                            {e.default === ""
                                                ? "Not set"
                                                : e.default}
                                        </p>
                                        <p>
                                            <strong>Comment: </strong>
                                            {e.comment === "" ? (
                                                "No comment"
                                            ) : (
                                                <div className="max-w-[260px] break-words">
                                                    {e.comment}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                }
                                position="right"
                                showArrow
                            >
                                {field(e, i)}
                            </Popover>
                        ) : (
                            field(e, i)
                        );
                    })}
                </div>
            </foreignObject>
            <SideSheet
                title="Edit table"
                size="small"
                visible={
                    selectedElement.element === ObjectType.TABLE &&
                    selectedElement.id === tableData.id &&
                    selectedElement.open &&
                    !layout.sidebar
                }
                onCancel={() =>
                    setSelectedElement((prev) => ({
                        ...prev,
                        open: !prev.open,
                    }))
                }
                style={{ paddingBottom: "16px" }}
            >
                <div className="sidesheet-theme">
                    <TableInfo data={tableData} />
                </div>
            </SideSheet>
        </>
    );

    function field(fieldData, index) {
        return (
            <div
                className={`${
                    index === tableData.fields.length - 1
                        ? ""
                        : "border-b border-gray-400"
                } group h-[36px] px-2 py-1 flex justify-between items-center gap-1 w-full overflow-hidden`}
                onMouseEnter={() => {
                    setHoveredField(index);
                    setHoveredTable({
                        tableId: tableData.id,
                        field: index,
                    });
                }}
                onMouseLeave={() => {
                    setHoveredField(-1);
                }}
            >
                <div
                    className={`${
                        hoveredField === index ? "text-zinc-400" : ""
                    } flex items-center gap-2 overflow-hidden`}
                >
                    <button
                        className="flex-shrink-0 w-[10px] h-[10px] bg-[#2f68adcc] rounded-full"
                        onMouseDown={() => {
                            handleGripField(index);
                            setLinkingLine((prev) => ({
                                ...prev,
                                startFieldId: index,
                                startTableId: tableData.id,
                                startX: tableData.x + 15,
                                startY:
                                    tableData.y +
                                    index * tableFieldHeight +
                                    tableHeaderHeight +
                                    tableColorStripHeight +
                                    12,
                                endX: tableData.x + 15,
                                endY:
                                    tableData.y +
                                    index * tableFieldHeight +
                                    tableHeaderHeight +
                                    tableColorStripHeight +
                                    12,
                            }));
                        }}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {fieldData.name}
                    </span>
                </div>
                <div className="text-zinc-400">
                    {hoveredField === index ? (
                        <Button
                            theme="solid"
                            size="small"
                            style={{
                                backgroundColor: "#d42020b3",
                            }}
                            icon={<IconMinus />}
                            onClick={() => deleteField(fieldData, tableData.id)}
                        />
                    ) : (
                        <div className="flex gap-1 items-center">
                            {fieldData.primary && <IconKeyStroked />}
                            <span>{fieldData.type}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
