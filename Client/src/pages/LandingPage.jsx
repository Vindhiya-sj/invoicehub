import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
    const navigate = useNavigate();
    const [modules, setModules] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [paymentsCount, setPaymentsCount] = useState(0);
    useEffect(() => {

        const interval = setInterval(() => {

            setModules(prev => {
                if (prev < 4) return prev + 1;
                return prev;
            });

            setClientsCount(prev => {
                if (prev < 500) return prev + 10;
                return prev;
            });

            setPaymentsCount(prev => {
                if (prev < 2000) return prev + 40;
                return prev;
            });

        }, 20);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="landing-page">

            {/* Navbar */}
            <nav className="navbar">
                <div className="logo-container">

                    <div className="logo-icon">
                        IH
                    </div>

                    <h2 className="logo-text">
                        InvoiceHub
                    </h2>

                </div>

            

                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#screenshots">Screenshots</a>
                    <a href="#workflow">Workflow</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>

                <div>
                    <button
                        className="login-btn"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </button>
                </div>

            </nav>


            {/* Hero Section */}

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Smart Invoice & Quotation
                        Management System
                    </h1>

                    <p>
                        Create quotations, generate invoices,
                        track payments and manage clients
                        in one place.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="hero-btn"
                            onClick={() => navigate("/")}
                        >
                            Get Started
                        </button>

                        <a
                            href="#features"
                            className="learn-btn"
                        >
                            Learn More
                        </a>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section id="features" className="features">

                <h2>Our Features</h2>

                <div className="feature-cards">

                    <div className="card">
                        <h3> 📄Quotation Management</h3>
                        <p>
                            Create, edit and manage
                            quotations easily.
                        </p>
                    </div>

                    <div className="card">
                        <h3> 📄Invoice Generation</h3>
                        <p>
                            Generate invoices and
                            download PDF instantly.
                        </p>
                    </div>

                    <div className="card">
                        <h3> 📊Payment Tracking</h3>
                        <p>
                            Monitor paid and pending
                            payments.
                        </p>
                    </div>

                    <div className="card">
                        <h3> 🧑‍💼Client Management</h3>
                        <p>
                            Store and manage all client
                            details securely.
                        </p>
                    </div>

                </div>

            </section>
            <section className="highlights">

                <div className="highlight-box">
                    <h3>⚡ Fast</h3>
                    <p>Create invoices within seconds.</p>
                </div>

                <div className="highlight-box">
                    <h3>🔒 Secure</h3>
                    <p>Protected using JWT Authentication.</p>
                </div>

                <div className="highlight-box">
                    <h3>📄 PDF Export</h3>
                    <p>Download invoices and quotations instantly.</p>
                </div>

                <div className="highlight-box">
                    <h3>📊 Easy Tracking</h3>
                    <p>Monitor payments and client records easily.</p>
                </div>

            </section>
            {/* Screenshots */}
            <section id="screenshots" className="screenshots">

                <h2>Application Screenshots</h2>

                <p className="screen-subtitle">
                    Explore the main modules of InvoiceHub
                </p>

                <div className="screenshot-grid">

                    <div className="shot-card">
                        <img src="/dashboard.png" alt="Dashboard" />
                        <h3>Dashboard</h3>
                        <p>Overview of invoices, quotations and payments.</p>
                    </div>

                    <div className="shot-card">
                        <img src="/clients.png" alt="Clients" />
                        <h3>Clients</h3>
                        <p>Manage all client details efficiently.</p>
                    </div>

                    <div className="shot-card">
                        <img src="/quotation.png" alt="Quotation" />
                        <h3>Quotation</h3>
                        <p>Create and manage quotations easily.</p>
                    </div>

                    <div className="shot-card">
                        <img src="/invoice.png" alt="Invoice" />
                        <h3>Invoice</h3>
                        <p>Generate invoices and export PDF files.</p>
                    </div>

                    <div className="shot-card">
                        <img src="/payments.png" alt="Payments" />
                        <h3>Payment</h3>
                        <p>Track payment status and history.</p>
                    </div>

                    <div className="shot-card">
                        <img src="/settings.png" alt="Settings" />
                        <h3>Settings</h3>
                        <p>Configure company details and preferences.</p>
                    </div>

                </div>

            </section>
            {/* Stats */}

            <section className="stats">

                <div>
                    <h2>{modules}</h2>
                    <p>Modules</p>
                </div>

                <div>
                    <h2>{clientsCount}+</h2>
                    <p>Clients</p>
                </div>

                <div>
                    <h2>{paymentsCount}+</h2>
                    <p>Payments</p>
                </div>

            </section>
            {/* Workflow */}
            <section id="workflow" className="workflow">

                <h2>How It Works</h2>

                <div className="workflow-container">

                    <div className="step">
                        <h3>👤</h3>
                        <p>Client Added</p>
                    </div>

                    <div className="arrow">→</div>

                    <div className="step">
                        <h3>📄</h3>
                        <p>Quotation Created</p>
                    </div>

                    <div className="arrow">→</div>

                    <div className="step">
                        <h3>🧾</h3>
                        <p>Invoice Generated</p>
                    </div>

                    <div className="arrow">→</div>

                    <div className="step">
                        <h3>💰</h3>
                        <p>Payment Received</p>
                    </div>

                </div>

            </section>
            {/* Technologies */}
            <section className="tech">

                <h2>Technologies Used</h2>

                <div className="tech-grid">

                    <div>MongoDB</div>
                    <div>Express JS</div>
                    <div>React JS</div>
                    <div>Node JS</div>
                    <div>JWT Auth</div>
                    <div>PDF Generator</div>

                </div>

            </section>
            <section className="cta">

                <h2>Ready to Simplify Your Business?</h2>

                <p>
                    Manage quotations, invoices, clients and payments
                    from a single platform.
                </p>

                <button
                    className="hero-btn"
                    onClick={() => navigate("/")}
                >
                    Start Now
                </button>

            </section>
            <section className="testimonials">

                <h2>What Users Say</h2>

                <div className="testimonial-grid">

                    <div className="testimonial-card">
                        <p>
                            "InvoiceHub simplified our invoicing process and saved hours every week."
                        </p>
                        <h4>- Business Owner</h4>
                    </div>

                    <div className="testimonial-card">
                        <p>
                            "Easy client management and instant PDF generation."
                        </p>
                        <h4>- Freelancer</h4>
                    </div>

                    <div className="testimonial-card">
                        <p>
                            "Perfect solution for quotation and payment tracking."
                        </p>
                        <h4>- Startup Founder</h4>
                    </div>

                </div>

            </section>

            <section className="faq">

                <h2>Frequently Asked Questions</h2>

                <div className="faq-item">
                    <h3>Can I generate PDF invoices?</h3>
                    <p>Yes, InvoiceHub supports instant PDF generation.</p>
                </div>

                <div className="faq-item">
                    <h3>Can I manage clients?</h3>
                    <p>Yes, you can add, edit and delete clients.</p>
                </div>

                <div className="faq-item">
                    <h3>Can I track payments?</h3>
                    <p>Yes, payment status can be monitored easily.</p>
                </div>

            </section>
            <button
                className="top-btn"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }
            >
                ↑
            </button>



            {/* About */}

            <section id="about" className="about">

                <h2>About InvoiceHub</h2>

                <p>
                    InvoiceHub is a MERN Stack based
                    Invoice & Quotation Management System
                    that helps businesses simplify billing,
                    client handling and payment tracking.
                </p>

            </section>
            <section id="contact" className="contact">

                <h2>Contact Us</h2>

                <div className="contact-box">

                    <div>
                        <h3>Email</h3>
                        <p>invoicehub@gmail.com</p>
                    </div>

                    <div>
                        <h3>Phone</h3>
                        <p>+91 9876543210</p>
                    </div>

                    <div>
                        <h3>Location</h3>
                        <p>Tamil Nadu, India</p>
                    </div>

                </div>

            </section>
            {/* Footer */}

            <footer className="footer">

                <h2>InvoiceHub</h2>

                <p>
                    Smart Invoice & Quotation Management System
                </p>

                <div className="footer-links">
                    <a href="#features">Features</a>
                    <a href="#screenshots">Screenshots</a>
                    <a href="#contact">Contact</a>
                </div>

                <p>
                    © 2026 InvoiceHub | All Rights Reserved
                </p>

            </footer>

        </div>
    );
}

export default LandingPage;