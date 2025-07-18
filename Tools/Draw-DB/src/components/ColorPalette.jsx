import { Button } from "@douyinfe/semi-ui";
import { IconCheckboxTick } from "@douyinfe/semi-icons";
import { tableThemes } from "../data/constants";

export default function ColorPalette({
    currentColor,
    onClearColor,
    onPickColor,
}) {
    return (
        <div>
            <div className="flex justify-between items-center p-2">
                <div className="font-medium">Theme</div>
                <Button type="tertiary" size="small" onClick={onClearColor}>
                    Clear
                </Button>
            </div>
            <hr />
            <div className="py-3 space-y-3">
                <div className="flex flex-wrap w-72 gap-y-2">
                    {tableThemes.map((c) => (
                        <button
                            key={c}
                            style={{ backgroundColor: c }}
                            className="w-10 h-10 rounded-full mx-1"
                            onClick={() => onPickColor(c)}
                        >
                            <IconCheckboxTick
                                className="pt-1"
                                style={{
                                    color: currentColor === c ? "white" : c,
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
