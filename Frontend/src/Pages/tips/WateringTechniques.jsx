import '../../css/projects.css';

export default function WateringTechniques() {
    return (
        <div className="projects-detail">
            <span className="projects-detail-tag">Tip</span>
            <div className="projects-detail-header">
                <h2>Watering Techniques</h2>
            </div>

            <img
                src="/Icons/watering_can.png"
                alt="Watering Techniques"
                className="projects-detail-image"
            />

            <div className="projects-detail-body">
                <p>
                    Getting watering right is the single biggest factor in keeping houseplants healthy.
                    Too much water causes root rot; too little causes stress and leaf drop. The right
                    technique depends on the plant and its pot.
                </p>

                <h3>Top watering</h3>
                <p>
                    The most common method — pour water slowly and evenly over the soil surface until
                    it drains freely from the bottom holes. Always empty the saucer after 30 minutes
                    to prevent roots sitting in standing water.
                </p>

                <h3>Bottom watering (soaking)</h3>
                <p>
                    Place the pot in a shallow tray of water and let the plant drink from the bottom
                    up for 15–20 minutes. This encourages roots to grow deeper and ensures the whole
                    root ball gets moisture. It works especially well for plants like peace lilies and
                    ferns that enjoy consistent moisture.
                </p>

                <h3>The finger test</h3>
                <p>
                    Before watering, push your finger 2–3 cm into the soil. If it feels damp, wait.
                    If it feels dry, water thoroughly. Most houseplants prefer to partially dry out
                    between waterings.
                </p>

                <h3>Signs you're overwatering</h3>
                <ul>
                    <li>Yellow, limp, or mushy leaves</li>
                    <li>Soil that stays wet for more than a week</li>
                    <li>Fungus gnats around the pot</li>
                    <li>A sour or musty smell from the soil</li>
                </ul>

                <h3>Signs you're underwatering</h3>
                <ul>
                    <li>Crispy or curling leaf edges</li>
                    <li>Leaves drooping but soil is bone dry</li>
                    <li>Soil pulling away from the sides of the pot</li>
                    <li>Slow growth even in the growing season</li>
                </ul>

                <h3>Best practices</h3>
                <ul>
                    <li>Use room-temperature water — cold water can shock tropical plants.</li>
                    <li>If you use tap water, let it sit uncovered overnight to allow chlorine to dissipate.</li>
                    <li>Water in the morning so any foliage that gets wet has time to dry before night.</li>
                    <li>Adjust frequency with the seasons — most plants need far less water in winter.</li>
                </ul>
            </div>
        </div>
    );
}
