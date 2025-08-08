export default function Decorated({ children }) {
    return (
        <span className="isVPCS-text" style={{ background: "red", color: "#fff" }}>
            {children}
        </span>
    );
}
