import "./Loading.css";

function Loading({ colors, size }) {
    let style = {
        borderTopColor: "#3498db"
    };

    if (colors && colors.length > 0) {
        style = {
            borderTopColor: colors[0] ? colors[0] : "#3498db",
            borderRightColor: colors[1] ? colors[1] : "#eee",
            borderBottomColor: colors[2] ? colors[2] : "#eee",
            borderLeftColor: colors[3] ? colors[3] : "#eee"
        };
    }

    const loadingSize = size ? size : "medium";
    
    return <div className={"loader " + loadingSize} style={style} />;
}

export default Loading;
