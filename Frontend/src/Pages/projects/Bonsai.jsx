import '../../css/projects.css';

export default function Bonsai() {
    return (
        <div className="projects-detail">
            <span className="projects-detail-tag">Project</span>
            <div className="projects-detail-header">
                <h2>Bonsai</h2>
            </div>

            <img
                src="/vite.svg"
                alt="Bonsai"
                className="projects-detail-image"
            />

            <div className="projects-detail-body">
                <p>
                    Bonsai is the ancient art of cultivating miniature trees in containers. With patience and
                    the right techniques, almost any woody plant can be trained into a living sculpture that
                    fits perfectly in an urban home.
                </p>

                <h3>What you'll need</h3>
                <ul>
                    <li>A young tree or pre-bonsai starter (juniper, ficus, or jade work well indoors)</li>
                    <li>Shallow bonsai pot with drainage holes</li>
                    <li>Bonsai or well-draining akadama soil mix</li>
                    <li>Bonsai pruning shears and wire cutters</li>
                    <li>Aluminium or copper training wire (1–2 mm gauge)</li>
                </ul>

                <h3>Getting started</h3>
                <div className="projects-detail-steps">
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">1</span>
                        <p>Choose a healthy young tree with an interesting trunk or branch structure. Remove it gently from its nursery pot.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">2</span>
                        <p>Rinse the roots and trim about a third of the root mass, working outward from the centre to encourage fine feeder roots.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">3</span>
                        <p>Place the tree in your bonsai pot, anchor it with wire through the drainage holes, and fill with bonsai soil. Press the soil firmly to remove air pockets.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">4</span>
                        <p>Wrap training wire gently around the trunk and branches you want to shape. Bend slowly and carefully — bonsai wire should spiral at a 45° angle.</p>
                    </div>
                    <div className="projects-detail-step">
                        <span className="projects-detail-step-num">5</span>
                        <p>Place in a bright spot. Water thoroughly when the topsoil feels just dry. Remove wire after 6–12 weeks before it cuts into the bark.</p>
                    </div>
                </div>

                <h3>Ongoing care</h3>
                <ul>
                    <li>Prune new growth regularly to maintain your chosen silhouette.</li>
                    <li>Repot every 2–3 years in spring as the roots fill the pot.</li>
                    <li>Feed with a balanced liquid fertiliser every two weeks during the growing season.</li>
                    <li>Mist the foliage on dry days to raise humidity around the leaves.</li>
                </ul>
            </div>
        </div>
    );
}
