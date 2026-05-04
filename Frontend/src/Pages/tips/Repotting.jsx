import '../../css/projects.css';

export default function Repotting() {
    return (
        <div className="projects-detail">
            <span className="projects-detail-tag">Tip</span>
            <div className="projects-detail-header">
                <h2>Repotting</h2>
            </div>

            <img
                src="/Icons/repotting.png"
                alt="Repotting"
                className="projects-detail-image"
            />

            <div className="projects-detail-body">
                <p>
                    Repotting gives a root-bound plant fresh soil and more room to grow. Most
                    houseplants need repotting every 1–2 years. Doing it correctly minimises stress
                    and sets the plant up for a strong growing season.
                </p>

                <h3>Signs your plant needs repotting</h3>
                <ul>
                    <li>Roots are circling the bottom of the pot or poking through drainage holes</li>
                    <li>The plant dries out very quickly after watering</li>
                    <li>Growth has slowed noticeably despite good light and feeding</li>
                    <li>The plant is top-heavy and tips over easily</li>
                    <li>Salt or mineral deposits are crusted on the soil surface</li>
                </ul>

                <h3>Choosing the right pot</h3>
                <p>
                    Go up only one pot size (2–5 cm larger in diameter). Too large a pot holds excess
                    moisture around the roots, which can cause rot. Terracotta pots are breathable and
                    forgiving for beginners; plastic pots retain moisture longer.
                </p>

                <h3>How to repot</h3>
                <div className="projects-detail-steps">
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">1</span>
                        <p>Water the plant 24 hours before repotting — moist soil holds together better and reduces root damage.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">2</span>
                        <p>Tip the plant gently out of its pot. If stuck, run a knife around the inside edge or squeeze a plastic pot.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">3</span>
                        <p>Loosen the root ball with your fingers, removing as much of the old soil as possible without tearing roots unnecessarily.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">4</span>
                        <p>Trim any dead, mushy, or excessively long roots with clean, sharp scissors.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">5</span>
                        <p>Add a layer of fresh potting mix to the base of the new pot. Place the plant so its root crown sits 2–3 cm below the rim, then fill around the roots with fresh mix. Firm gently.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">6</span>
                        <p>Water thoroughly until water drains freely, then place in a bright spot out of direct sun for 1–2 weeks while the plant recovers.</p>
                    </div>
                </div>

                <h3>After repotting</h3>
                <ul>
                    <li>Hold off fertilising for 4–6 weeks — fresh potting mix contains enough nutrients.</li>
                    <li>Some leaf droop in the first week is normal; keep the soil just moist.</li>
                    <li>Avoid direct sun immediately after repotting as the plant is more vulnerable to stress.</li>
                    <li>Best time to repot is spring, just as new growth begins.</li>
                </ul>
            </div>
        </div>
    );
}
