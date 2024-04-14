const svgNS = "http://www.w3.org/2000/svg";

let frame = document.getElementById('frame');

class BaseShape {
    THREAD_OFFSET = 1;
    SCALE = 20;
    AXIS_TOP = 300;
    FACE_LEFT = 800;
    AXIS_OVERFLOW = 0;
    FACE_OVERFLOW = 20;
    HOLE_OFFSET = 1;
    NOMINAL_DIAMETER = 6;

    constructor() {
        this.HOLE_OFFSET *= this.SCALE;
        this.THREAD_OFFSET *= this.SCALE;
        this.NOMINAL_DIAMETER *= this.SCALE;
    }
};

class StudImplantation extends BaseShape {

    lamage_angle = 45 * Math.PI / 180;
    tip_angle = 65 * Math.PI / 180;

    constructor(diameter, lamage_diameter, lamage_deep, total_deep, thread_deep) {
        super();

        this.diameter = diameter * this.SCALE;
        this.lamage_diameter = lamage_diameter * this.SCALE;
        this.lamage_deep = lamage_deep * this.SCALE;
        this.total_deep = total_deep * this.SCALE;
        this.thread_deep = thread_deep * this.SCALE;

        this.IMPLE_CH_LENGHT = (this.THREAD_OFFSET + 0.5 * (this.lamage_diameter - this.diameter)) / Math.tan(this.lamage_angle);
        this.TIP_LENGHT = 0.5 * this.diameter / Math.abs(Math.tan(this.tip_angle));
    }

    draw_hole(element) {

        let points = [
            [
                this.FACE_LEFT,
                0,
            ],
            [
                this.FACE_LEFT,
                this.AXIS_TOP - 0.5 * this.lamage_diameter,
            ],
            [
                this.FACE_LEFT - this.lamage_deep,
                this.AXIS_TOP - 0.5 * this.lamage_diameter,
            ],
            [
                this.FACE_LEFT - this.lamage_deep - this.IMPLE_CH_LENGHT,
                this.AXIS_TOP - 0.5 * this.diameter + this.THREAD_OFFSET,
            ],
            [
                this.FACE_LEFT - this.total_deep,
                this.AXIS_TOP - 0.5 * this.diameter + this.THREAD_OFFSET,
            ],
            [
                this.FACE_LEFT - this.total_deep - this.TIP_LENGHT,
                this.AXIS_TOP,
            ],
            [
                this.FACE_LEFT - this.total_deep,
                this.AXIS_TOP + 0.5 * this.diameter - this.THREAD_OFFSET,
            ],
            [
                this.FACE_LEFT - this.lamage_deep - this.IMPLE_CH_LENGHT,
                this.AXIS_TOP + 0.5 * this.diameter - this.THREAD_OFFSET,
            ],
            [
                this.FACE_LEFT - this.lamage_deep,
                this.AXIS_TOP + 0.5 * this.lamage_diameter,
            ],
            [
                this.FACE_LEFT,
                this.AXIS_TOP + 0.5 * this.lamage_diameter,
            ],
            [
                this.FACE_LEFT,
                100000,
            ]
        ];

        // Définir l'attribut "points" de la polyline
        let implantation = document.createElementNS(svgNS, "polyline");
        implantation.setAttribute("points", points);
        implantation.setAttribute("class", "stud implantation");

        element.appendChild(implantation);
    }

    draw_threads(element) {

        const THREAD_BEGIN = this.FACE_LEFT - this.lamage_deep - 0.5 * (this.lamage_diameter - this.diameter) / Math.tan(this.lamage_angle);

        let upper_thread = document.createElementNS(svgNS, "line");
        upper_thread.setAttribute("x1", THREAD_BEGIN);
        upper_thread.setAttribute("y1", this.AXIS_TOP - 0.5 * this.diameter);
        upper_thread.setAttribute("x2", this.FACE_LEFT - this.thread_deep);
        upper_thread.setAttribute("y2", this.AXIS_TOP - 0.5 * this.diameter);
        upper_thread.setAttribute("class", "stud implantation")

        let lower_thread = document.createElementNS(svgNS, "line");
        lower_thread.setAttribute("x1", THREAD_BEGIN);
        lower_thread.setAttribute("y1", this.AXIS_TOP + 0.5 * this.diameter);
        lower_thread.setAttribute("x2", this.FACE_LEFT - this.thread_deep);
        lower_thread.setAttribute("y2", this.AXIS_TOP + 0.5 * this.diameter);
        lower_thread.setAttribute("class", "stud implantation")

        let points = [
            [
                this.FACE_LEFT - this.thread_deep,
                this.AXIS_TOP + 0.5 * this.diameter,
            ],
            [
                this.FACE_LEFT - this.thread_deep,
                this.AXIS_TOP - 0.5 * this.diameter,
            ],
            // [
            //     this.FACE_LEFT - this.thread_deep - this.THREAD_OFFSET,
            //     this.AXIS_TOP - 0.5 * this.diameter + this.THREAD_OFFSET,
            // ],
            // [
            //     this.FACE_LEFT - this.thread_deep - this.THREAD_OFFSET,
            //     this.AXIS_TOP + 0.5 * this.diameter - this.THREAD_OFFSET,
            // ],
            // [
            //     this.FACE_LEFT - this.thread_deep,
            //     this.AXIS_TOP + 0.5 * this.diameter,
            // ],
        ]

        let thread_end = document.createElementNS(svgNS, "polyline");
        thread_end.setAttribute("points", points)
        thread_end.setAttribute("class", "stud implantation")

        element.appendChild(upper_thread);
        element.appendChild(lower_thread);
        element.appendChild(thread_end);
        // element.appendChild(lower_champfer);
    }

    draw(element) {
        this.draw_hole(element);
        this.draw_threads(element);
    }

};

class Stud extends BaseShape {

    constructor(
        nominal_diameter,
        base_diameter,
        base_lenght,
        nominal_lenght,
        thread_lenght,
        withdrawal,
    ) {
        super();

        this.base_lenght = base_lenght * this.SCALE;
        this.nominal_lenght = nominal_lenght * this.SCALE;
        this.nominal_diameter = nominal_diameter * this.SCALE;
        this.base_diameter = base_diameter * this.SCALE;
        this.withdrawal = withdrawal * this.SCALE;
        this.thread_lenght = thread_lenght * this.SCALE;
    }

    draw_main_shape(element) {

        let face_left = this.FACE_LEFT - this.withdrawal;

        let P1 = [
            face_left,
            this.AXIS_TOP - 0.5 * this.base_diameter
        ];

        let P2 = [
            face_left,
            this.AXIS_TOP - 0.5 * this.nominal_diameter
        ];

        let P3 = [
            face_left + this.nominal_lenght,
            this.AXIS_TOP - 0.5 * this.nominal_diameter,
        ];

        let P4 = [
            face_left + this.nominal_lenght,
            this.AXIS_TOP + 0.5 * this.nominal_diameter,
        ];

        let P5 = [
            face_left,
            this.AXIS_TOP + 0.5 * this.nominal_diameter,
        ];

        let P6 = [
            face_left,
            this.AXIS_TOP + 0.5 * this.base_diameter,
        ];

        let P7 = [
            face_left - this.base_lenght,
            this.AXIS_TOP + 0.5 * this.base_diameter,
        ];

        let P8 = [
            face_left - this.base_lenght,
            this.AXIS_TOP - 0.5 * this.base_diameter,
        ];

        let points = [P1, P2, P3, P4, P5, P6, P7, P8, P1];

        // Définir l'attribut "points" de la polyline
        let main_shape = document.createElementNS(svgNS, "polyline");
        main_shape.setAttribute("points", points);
        main_shape.setAttribute("class", "stud");

        element.appendChild(main_shape);
    }

    draw_faces(element) {

        let face1 = document.createElementNS(svgNS, "line");
        face1.setAttribute("x1", this.FACE_LEFT);
        face1.setAttribute("y1", this.AXIS_TOP - Math.max(this.nominal_diameter, this.base_diameter) * 0.5 - this.FACE_OVERFLOW);
        face1.setAttribute("x2", this.FACE_LEFT);
        face1.setAttribute("y2", this.AXIS_TOP - this.nominal_diameter * 0.5);
        face1.setAttribute("class", "stud face");

        let face2 = document.createElementNS(svgNS, "line");
        face2.setAttribute("x1", this.FACE_LEFT);
        face2.setAttribute("y1", this.AXIS_TOP + this.nominal_diameter * 0.5);
        face2.setAttribute("x2", this.FACE_LEFT);
        face2.setAttribute("y2", this.AXIS_TOP + Math.max(this.nominal_diameter, this.base_diameter) * 0.5 + this.FACE_OVERFLOW);
        face2.setAttribute("class", "stud face");

        element.appendChild(face1);
        element.appendChild(face2);
    }

    draw_axis(element) {

        let face_left = this.FACE_LEFT - this.withdrawal;

        let axis = document.createElementNS(svgNS, "line");
        axis.setAttribute("x1", face_left - this.base_lenght - this.AXIS_OVERFLOW);
        axis.setAttribute("y1", this.AXIS_TOP);
        axis.setAttribute("x2", face_left + this.nominal_lenght + this.AXIS_OVERFLOW);
        axis.setAttribute("y2", this.AXIS_TOP);
        axis.setAttribute("class", "stud axis");
        axis.setAttribute("stroke-dasharray", "15,5 5,5")

        element.appendChild(axis);
    }

    draw_base_thread(element) {

        let face_left = this.FACE_LEFT - this.withdrawal;
        let base_diameter = this.base_diameter;
        let thread_offset = this.THREAD_OFFSET;
        let base_lenght = this.base_lenght;
        let axis_top = this.AXIS_TOP;

        let upper_base_thread = document.createElementNS(svgNS, "line");
        upper_base_thread.setAttribute("x1", face_left - base_lenght);
        upper_base_thread.setAttribute("y1", axis_top - base_diameter * 0.5 + thread_offset);
        upper_base_thread.setAttribute("x2", face_left);
        upper_base_thread.setAttribute("y2", axis_top - base_diameter * 0.5 + thread_offset);
        upper_base_thread.setAttribute("class", "stud thread");

        let lower_base_thread = document.createElementNS(svgNS, "line");
        lower_base_thread.setAttribute("x1", face_left - base_lenght);
        lower_base_thread.setAttribute("y1", axis_top + base_diameter * 0.5 - thread_offset);
        lower_base_thread.setAttribute("x2", face_left);
        lower_base_thread.setAttribute("y2", axis_top + base_diameter * 0.5 - thread_offset);
        lower_base_thread.setAttribute("class", "stud thread");

        element.appendChild(upper_base_thread);
        element.appendChild(lower_base_thread);
    }

    draw_nominal_thread(element) {

        let face_left = this.FACE_LEFT - this.withdrawal;
        let thread_offset = this.THREAD_OFFSET;
        let axis_top = this.AXIS_TOP;
        let nominal_lenght = this.nominal_lenght;
        let thread_lenght = this.thread_lenght;
        let nominal_diameter = this.nominal_diameter;

        let upper_nominal_thread = document.createElementNS(svgNS, "line");
        upper_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
        upper_nominal_thread.setAttribute("y1", axis_top - nominal_diameter * 0.5 + thread_offset);
        upper_nominal_thread.setAttribute("x2", face_left + nominal_lenght);
        upper_nominal_thread.setAttribute("y2", axis_top - nominal_diameter * 0.5 + thread_offset);
        upper_nominal_thread.setAttribute("class", "stud thread");

        let lower_nominal_thread = document.createElementNS(svgNS, "line");
        lower_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
        lower_nominal_thread.setAttribute("y1", axis_top + nominal_diameter * 0.5 - thread_offset);
        lower_nominal_thread.setAttribute("x2", face_left + nominal_lenght);
        lower_nominal_thread.setAttribute("y2", axis_top + nominal_diameter * 0.5 - thread_offset);
        lower_nominal_thread.setAttribute("class", "stud thread");

        let end_nominal_thread = document.createElementNS(svgNS, "line");
        end_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread.setAttribute("y1", axis_top + nominal_diameter * 0.5);
        end_nominal_thread.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread.setAttribute("y2", axis_top - nominal_diameter * 0.5);
        end_nominal_thread.setAttribute("class", "stud thread");

        let end_nominal_thread_upper_champfer = document.createElementNS(svgNS, "line");
        end_nominal_thread_upper_champfer.setAttribute("x1", face_left + nominal_lenght - thread_lenght - this.THREAD_OFFSET);
        end_nominal_thread_upper_champfer.setAttribute("y1", axis_top - nominal_diameter * 0.5);
        end_nominal_thread_upper_champfer.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread_upper_champfer.setAttribute("y2", axis_top - nominal_diameter * 0.5 + thread_offset);
        end_nominal_thread_upper_champfer.setAttribute("class", "stud thread");

        let end_nominal_thread_lower_champfer = document.createElementNS(svgNS, "line");
        end_nominal_thread_lower_champfer.setAttribute("x1", face_left + nominal_lenght - thread_lenght - this.THREAD_OFFSET);
        end_nominal_thread_lower_champfer.setAttribute("y1", axis_top + nominal_diameter * 0.5);
        end_nominal_thread_lower_champfer.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread_lower_champfer.setAttribute("y2", axis_top + nominal_diameter * 0.5 - thread_offset);
        end_nominal_thread_lower_champfer.setAttribute("class", "stud thread");

        element.appendChild(upper_nominal_thread);
        element.appendChild(lower_nominal_thread);
        element.appendChild(end_nominal_thread);
        element.appendChild(end_nominal_thread_upper_champfer);
        element.appendChild(end_nominal_thread_lower_champfer);
    }

    draw(element, draw_axis = true, draw_faces = true) {

        this.draw_main_shape(element);
        this.draw_base_thread(element);
        this.draw_nominal_thread(element);

        if (draw_faces)
            this.draw_faces(element);

        if (draw_axis)
            this.draw_axis(element);
    }
};

class ThightenedPart extends BaseShape {

    constructor(height, offset, class_name) {

        super();

        this.class_name = class_name;
        this.offset = offset * this.SCALE;
        this.height = height * this.SCALE;
    }

    draw_upper_rect(element) {

        let points = [
            [
                this.FACE_LEFT + this.offset,
                0,
            ],
            [
                this.FACE_LEFT + this.offset,
                this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER - this.HOLE_OFFSET
            ],
            [
                this.FACE_LEFT + this.offset + this.height,
                this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER - this.HOLE_OFFSET,
            ],

            [
                this.FACE_LEFT + this.offset + this.height,
                0,
            ],
        ];

        // Définir l'attribut "points" de la polyline
        let upper_rect = document.createElementNS(svgNS, "polyline");
        upper_rect.setAttribute("points", points);
        upper_rect.setAttribute("class", `part ${this.class_name}`);

        element.appendChild(upper_rect);
    }

    draw_lower_rect(element) {

        let points = [
            [
                this.FACE_LEFT + this.offset,
                1000,
            ],
            [
                this.FACE_LEFT + this.offset,
                this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER + this.HOLE_OFFSET
            ],
            [
                this.FACE_LEFT + this.offset + this.height,
                this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER + this.HOLE_OFFSET,
            ],
            [
                this.FACE_LEFT + this.offset + this.height,
                1000,
            ],
        ];

        // Définir l'attribut "points" de la polyline
        let upper_rect = document.createElementNS(svgNS, "polyline");
        upper_rect.setAttribute("points", points);
        upper_rect.setAttribute("class", `part ${this.class_name}`);

        element.appendChild(upper_rect);
    }

    draw(element) {

        const HEIGHT = 20 * this.SCALE;

        this.draw_upper_rect(element, HEIGHT);
        this.draw_lower_rect(element, HEIGHT);
    }
};

class Nut extends BaseShape {

    constructor(height, offset, ext_diameter, champfer, section_wiew) {
        super()
        this.height = height * this.SCALE;
        this.offset = offset * this.SCALE;
        this.ext_diameter = ext_diameter * this.SCALE;
        this.champfer = champfer * this.SCALE
        this.section_wiew = section_wiew;

        this.ext_champfer_h = .5 * this.SCALE;
        this.face_left = this.FACE_LEFT + this.offset
    }

    draw_faces(element){

        let face_left = this.face_left;
        let ext_champfer_h = this.ext_champfer_h;

        let nut_faces = [
            `M ${face_left} ${this.AXIS_TOP - this.ext_diameter * 3 / 8}`,
            `c 0 0 ${0} ${this.ext_diameter / 16} ${ext_champfer_h} ${this.ext_diameter / 8}`,
            `c 0 0 ${-ext_champfer_h} ${this.ext_diameter / 8} ${-ext_champfer_h} ${this.ext_diameter / 4}`,
            `c 0 0 ${0} ${this.ext_diameter / 8} ${ext_champfer_h} ${this.ext_diameter / 4}`,
            `c 0 0 ${-ext_champfer_h} ${this.ext_diameter / 16} ${-ext_champfer_h} ${this.ext_diameter / 8}`,

            `m ${this.height} ${0}`,
            `c 0 0 ${0} -${this.ext_diameter / 16} -${ext_champfer_h} -${this.ext_diameter / 8}`,
            `c 0 0 ${ext_champfer_h} -${this.ext_diameter / 8} ${ext_champfer_h} -${this.ext_diameter / 4}`,
            `c 0 0 ${0} -${this.ext_diameter / 8} -${ext_champfer_h} -${this.ext_diameter / 4}`,
            `c 0 0 ${ext_champfer_h} -${this.ext_diameter / 16} ${ext_champfer_h} -${this.ext_diameter / 8}`,

            `M ${face_left + ext_champfer_h} ${this.AXIS_TOP - this.ext_diameter / 4}`,
            `h ${this.height - 2 * ext_champfer_h}`,

            `M ${face_left + ext_champfer_h} ${this.AXIS_TOP + this.ext_diameter / 4}`,
            `h ${this.height - 2 * ext_champfer_h}`,
        ]

        let faces = document.createElementNS(svgNS, "path");
        faces.setAttribute("d", nut_faces.join(" "));
        faces.setAttribute("class", "stud nut");

        element.appendChild(faces);
    }

    draw_nut(element) {

        let face_left = this.face_left;
        let ext_champfer_h = this.ext_champfer_h;

        let nut_shape = [
            `M ${face_left + this.height - ext_champfer_h} ${this.AXIS_TOP - 0.5 * this.ext_diameter}`,
            `h -${this.height - 2 * ext_champfer_h}`,
            `c 0 0 ${-ext_champfer_h} ${this.ext_diameter / 16} ${-ext_champfer_h} ${this.ext_diameter / 8}`,
            `v ${this.ext_diameter * 6 / 8}`,
            `c 0 0 ${0} ${this.ext_diameter / 16} ${ext_champfer_h} ${this.ext_diameter / 8}`,
            `h ${this.height - 2 * ext_champfer_h}`,
            `c 0 0 ${ext_champfer_h} -${this.ext_diameter / 16} ${ext_champfer_h} -${this.ext_diameter / 8}`,
            `v -${this.ext_diameter * 6 / 8}`,
            `c 0 0 ${0} -${this.ext_diameter / 16} -${ext_champfer_h} -${this.ext_diameter / 8}`,
        ]

        let shape = document.createElementNS(svgNS, "path")
        shape.setAttribute("d", nut_shape.join(" "));
        shape.setAttribute("class", "stud nut");

        element.appendChild(shape);
    }

    draw_section_view(element){

        let face_left = this.face_left;

        let path = [
            `M ${face_left} ${this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER + this.THREAD_OFFSET - this.champfer}`,
            `L ${face_left + this.champfer} ${this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER + this.THREAD_OFFSET} `,
            `h ${this.height - 2 * this.champfer}`,
            `l ${this.champfer} ${- this.champfer}`,

            `M ${face_left} ${this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER + this.champfer - this.THREAD_OFFSET}`,
            `L ${face_left + this.champfer} ${this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER - this.THREAD_OFFSET} `,
            `h ${this.height - 2 * this.champfer}`,
            `l ${this.champfer} ${this.champfer}`,

            `M ${face_left + this.champfer} ${this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER + this.THREAD_OFFSET}`,
            `v ${this.NOMINAL_DIAMETER - 2 * this.THREAD_OFFSET}`,

            `M ${face_left + this.height - this.champfer} ${this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER + this.THREAD_OFFSET}`,
            `v ${this.NOMINAL_DIAMETER - 2 * this.THREAD_OFFSET}`,

            `M ${face_left + this.height - this.champfer} ${this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER + this.THREAD_OFFSET}`,
            `m ${this.THREAD_OFFSET} -${this.THREAD_OFFSET}`,
            `h ${-this.height + this.THREAD_OFFSET + this.THREAD_OFFSET}`,

            `M ${face_left + this.height - this.champfer} ${this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER + this.THREAD_OFFSET}`,
            `m ${this.THREAD_OFFSET} -${this.THREAD_OFFSET}`,
            `h ${-this.height + this.THREAD_OFFSET + this.THREAD_OFFSET}`,
        ]

        let section = document.createElementNS(svgNS, "path")
        section.setAttribute("d", path.join(" "));
        section.setAttribute("class", "thread");
        section.setAttribute("fill-opacity", "0");
        section.setAttribute("stroke", "white");

        element.appendChild(section);
    }

    draw(element){
        this.draw_nut(element);

        if (this.section_wiew)
            this.draw_section_view(element)
        else
            this.draw_faces(element)
    }
}

// STUD
let nominal_diameter = 6;
let base_diameter = 10;
let base_lenght = 20;
let nominal_lenght = 40;
let thread_lenght = 20;
let withdraw = 1;
let stud = new Stud(
    nominal_diameter,
    base_diameter,
    base_lenght,
    nominal_lenght,
    thread_lenght,
    withdraw
);


// IMPLANTATION
let lamage_diameter = 13;
let lamage_deep = 3;
let total_deep = 30;
let thread_deep = 25
let implantation = new StudImplantation(
    base_diameter,
    lamage_diameter,
    lamage_deep,
    total_deep,
    thread_deep,
);

implantation.draw(frame);

// PARTS
let P1_thick = 12;
let P2_thick = 8;
let part1 = new ThightenedPart(P1_thick, 0, "part1");
let part2 = new ThightenedPart(P2_thick, P1_thick, "part2");

part1.draw(frame);
part2.draw(frame);

// NUT
let nut_height = 10;
let nut_diameter = 15;
let nut_champfer = 2;
let nut = new Nut(
    nut_height,
    P1_thick + P2_thick + 1,
    nut_diameter,
    nut_champfer,
    false,
);

if (nut.section_wiew){
    nut.draw(frame);
    stud.draw(frame, true, false);
}
else
{
    stud.draw(frame, true, false);
    nut.draw(frame);
}


