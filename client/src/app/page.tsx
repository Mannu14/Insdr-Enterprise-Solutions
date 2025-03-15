export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Manish Yadav's Assignment</h1>
      <nav>
        <a href="/Auth" style={styles.link}>Auth: Login</a>
        <a href="/NewsApi" style={styles.link}>Go to NewsApi</a>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    fontSize:"20px",
    marginTop:"100px",
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
  },
  link: {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#0070f3",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};
