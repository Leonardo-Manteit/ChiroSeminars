import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

export default function Settings() {
    return (
        <>
        <Nav />
        <section className="Settings">
            <div>Here are the settings</div>
            <div>Here are your current payment plans : 'NOTHING' </div>
            <button>cancel payment plan</button>
            <button>upgrade payment plan</button>
        </section>
        <Footer />
        </>
    )
}