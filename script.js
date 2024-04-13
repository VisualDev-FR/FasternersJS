const svgNS = "http://www.w3.org/2000/svg";

let frame = document.getElementById('frame');

function create_stud(nominal_diameter, base_diameter) {

    let polyline = document.createElementNS(svgNS, "polyline")

    let mult = 10;

    let value = mult * (base_diameter - base_diameter * 0.5 + nominal_diameter * 0.5)

    console.log(value);

    let points = [
        [0, 0],
        [0, base_diameter * mult],
        [300, base_diameter * mult],
        [300, mult * 0.5 * (nominal_diameter + base_diameter)],
        [500, mult * 0.5 * (nominal_diameter + base_diameter)],
        [500, mult * 0.5 * (base_diameter - nominal_diameter)],
        [300, mult * 0.5 * (base_diameter - nominal_diameter)],
        [300, 0],
        [0, 0]
    ];

    // Définir l'attribut "points" de la polyline
    polyline.setAttribute("points", points);

    // Définir d'autres attributs de style si nécessaire
    // polyline.setAttribute("stroke", "black");
    // polyline.setAttribute("stroke-width", "2");
    // polyline.setAttribute("fill", "none");
    polyline.setAttribute("transform", "translate(100, 100)");
    polyline.setAttribute("id", "stud")

    frame.appendChild(polyline);
}

create_stud(8, 12);