const svgNS = "http://www.w3.org/2000/svg";
const thread_offset = 1;

let frame = document.getElementById('frame');

function create_stud(
    nominal_diameter,
    base_diameter,
    base_lenght,
    nominal_lenght,
    thread_lenght,
    axis_top,
    face_left,
    withdrawal = 1,
    axis_overflow = 50,
    face_overflow = 20,
) {

    let mult = 20;

    base_lenght *= mult;
    nominal_lenght *= mult;
    nominal_diameter *= mult;
    base_diameter *= mult;
    withdrawal *= mult
    thread_lenght *= mult

    let face1 = document.createElementNS(svgNS, "line");
    face1.setAttribute("x1", face_left);
    face1.setAttribute("y1", axis_top - Math.max(nominal_diameter, base_diameter) * 0.5 - face_overflow);
    face1.setAttribute("x2", face_left);
    face1.setAttribute("y2", axis_top - nominal_diameter * 0.5);
    face1.setAttribute("class", "stud face");

    let face2 = document.createElementNS(svgNS, "line");
    face2.setAttribute("x1", face_left);
    face2.setAttribute("y1", axis_top + nominal_diameter * 0.5);
    face2.setAttribute("x2", face_left);
    face2.setAttribute("y2", axis_top + Math.max(nominal_diameter, base_diameter) * 0.5 + face_overflow);
    face2.setAttribute("class", "stud face");

    face_left -= withdrawal;

    let axis = document.createElementNS(svgNS, "line");
    axis.setAttribute("x1", face_left - base_lenght - axis_overflow);
    axis.setAttribute("y1", axis_top);
    axis.setAttribute("x2", face_left + nominal_lenght + axis_overflow);
    axis.setAttribute("y2", axis_top);
    axis.setAttribute("class", "stud axis");
    axis.setAttribute("stroke-dasharray", "15,5 5,5")

    let P1 = [
        face_left,
        axis_top - 0.5 * base_diameter
    ];

    let P2 = [
        face_left,
        axis_top - 0.5 * nominal_diameter
    ];

    let P3 = [
        face_left + nominal_lenght,
        axis_top - 0.5 * nominal_diameter,
    ];

    let P4 = [
        face_left + nominal_lenght,
        axis_top + 0.5 * nominal_diameter,
    ];

    let P5 = [
        face_left,
        axis_top + 0.5 * nominal_diameter,
    ];

    let P6 = [
        face_left,
        axis_top + 0.5 * base_diameter,
    ];

    let P7 = [
        face_left - base_lenght,
        axis_top + 0.5 * base_diameter,
    ];

    let P8 = [
        face_left - base_lenght,
        axis_top - 0.5 * base_diameter,
    ];

    let points = [P1, P2, P3, P4, P5, P6, P7, P8, P1];

    // Définir l'attribut "points" de la polyline
    let polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("points", points);
    polyline.setAttribute("class", "stud");

    let upper_base_thread = document.createElementNS(svgNS, "line");
    upper_base_thread.setAttribute("x1", face_left - base_lenght);
    upper_base_thread.setAttribute("y1", axis_top - base_diameter * 0.5 + thread_offset * mult);
    upper_base_thread.setAttribute("x2", face_left);
    upper_base_thread.setAttribute("y2", axis_top - base_diameter * 0.5 + thread_offset * mult);
    upper_base_thread.setAttribute("class", "stud thread");

    let lower_base_thread = document.createElementNS(svgNS, "line");
    lower_base_thread.setAttribute("x1", face_left - base_lenght);
    lower_base_thread.setAttribute("y1", axis_top + base_diameter * 0.5 - thread_offset * mult);
    lower_base_thread.setAttribute("x2", face_left);
    lower_base_thread.setAttribute("y2", axis_top + base_diameter * 0.5 - thread_offset * mult);
    lower_base_thread.setAttribute("class", "stud thread");

    let upper_nominal_thread = document.createElementNS(svgNS, "line");
    upper_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
    upper_nominal_thread.setAttribute("y1", axis_top - nominal_diameter * 0.5 + thread_offset * mult);
    upper_nominal_thread.setAttribute("x2", face_left + nominal_lenght);
    upper_nominal_thread.setAttribute("y2", axis_top - nominal_diameter * 0.5 + thread_offset * mult);
    upper_nominal_thread.setAttribute("class", "stud thread");

    let lower_nominal_thread = document.createElementNS(svgNS, "line");
    lower_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
    lower_nominal_thread.setAttribute("y1", axis_top + nominal_diameter * 0.5 - thread_offset * mult);
    lower_nominal_thread.setAttribute("x2", face_left + nominal_lenght);
    lower_nominal_thread.setAttribute("y2", axis_top + nominal_diameter * 0.5 - thread_offset * mult);
    lower_nominal_thread.setAttribute("class", "stud thread");

    let end_nominal_thread = document.createElementNS(svgNS, "line");
    end_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
    end_nominal_thread.setAttribute("y1", axis_top + nominal_diameter * 0.5);
    end_nominal_thread.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
    end_nominal_thread.setAttribute("y2", axis_top - nominal_diameter * 0.5);
    end_nominal_thread.setAttribute("class", "stud thread");

    let end_nominal_thread_upper_champfer = document.createElementNS(svgNS, "line");
    end_nominal_thread_upper_champfer.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
    end_nominal_thread_upper_champfer.setAttribute("y1", axis_top + nominal_diameter * 0.5);
    end_nominal_thread_upper_champfer.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
    end_nominal_thread_upper_champfer.setAttribute("y2", axis_top - nominal_diameter * 0.5);
    end_nominal_thread_upper_champfer.setAttribute("class", "stud thread");

    frame.appendChild(polyline);
    frame.appendChild(axis);

    frame.appendChild(face1);
    frame.appendChild(face2);

    frame.appendChild(upper_base_thread);
    frame.appendChild(lower_base_thread);

    frame.appendChild(upper_nominal_thread);
    frame.appendChild(lower_nominal_thread);
    frame.appendChild(end_nominal_thread);
    frame.appendChild(end_nominal_thread_upper_champfer);
};

const nominal_diameter = 8;
const base_diameter = 12;
const base_lenght = 20;
const nominal_lenght = 25;
const axis_top = 250;
const face_left = 800;
const axis_overflow = 0;
const thread_lenght = nominal_lenght - 7;

create_stud(
    nominal_diameter,
    base_diameter,
    base_lenght,
    nominal_lenght,
    thread_lenght,
    axis_top,
    face_left,
    // axis_overflow
);