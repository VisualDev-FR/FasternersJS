const svgNS = "http://www.w3.org/2000/svg";

let frame = document.getElementById('frame');

class BaseShape {
    THREAD_OFFSET = 1;
    SCALE = 20;
    AXIS_TOP = 250;
    FACE_LEFT = 800;
    AXIS_OVERFLOW = 0;
    FACE_OVERFLOW = 20;
    HOLE_OFFSET = 1;
    NOMINAL_DIAMETER = 6;

    constructor(){
        this.HOLE_OFFSET *= this.SCALE;
        this.NOMINAL_DIAMETER *= this.SCALE;
    }
}

class Stud extends BaseShape {

    constructor(
        nominal_diameter,
        base_diameter,
        base_lenght,
        nominal_lenght,
        thread_lenght,
        end_champfer_lenght = this.THREAD_OFFSET,
        withdrawal = 1,
    ) {
        super();

        this.base_lenght = base_lenght * this.SCALE;
        this.nominal_lenght = nominal_lenght * this.SCALE;
        this.nominal_diameter = nominal_diameter * this.SCALE;
        this.base_diameter = base_diameter * this.SCALE;
        this.withdrawal = withdrawal * this.SCALE;
        this.thread_lenght = thread_lenght * this.SCALE;
        this.end_champfer_lenght = end_champfer_lenght * this.SCALE;
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
        upper_base_thread.setAttribute("y1", axis_top - base_diameter * 0.5 + thread_offset * this.SCALE);
        upper_base_thread.setAttribute("x2", face_left);
        upper_base_thread.setAttribute("y2", axis_top - base_diameter * 0.5 + thread_offset * this.SCALE);
        upper_base_thread.setAttribute("class", "stud thread");

        let lower_base_thread = document.createElementNS(svgNS, "line");
        lower_base_thread.setAttribute("x1", face_left - base_lenght);
        lower_base_thread.setAttribute("y1", axis_top + base_diameter * 0.5 - thread_offset * this.SCALE);
        lower_base_thread.setAttribute("x2", face_left);
        lower_base_thread.setAttribute("y2", axis_top + base_diameter * 0.5 - thread_offset * this.SCALE);
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
        let end_champfer_lenght = this.end_champfer_lenght;

        let upper_nominal_thread = document.createElementNS(svgNS, "line");
        upper_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
        upper_nominal_thread.setAttribute("y1", axis_top - nominal_diameter * 0.5 + thread_offset * this.SCALE);
        upper_nominal_thread.setAttribute("x2", face_left + nominal_lenght);
        upper_nominal_thread.setAttribute("y2", axis_top - nominal_diameter * 0.5 + thread_offset * this.SCALE);
        upper_nominal_thread.setAttribute("class", "stud thread");

        let lower_nominal_thread = document.createElementNS(svgNS, "line");
        lower_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
        lower_nominal_thread.setAttribute("y1", axis_top + nominal_diameter * 0.5 - thread_offset * this.SCALE);
        lower_nominal_thread.setAttribute("x2", face_left + nominal_lenght);
        lower_nominal_thread.setAttribute("y2", axis_top + nominal_diameter * 0.5 - thread_offset * this.SCALE);
        lower_nominal_thread.setAttribute("class", "stud thread");

        let end_nominal_thread = document.createElementNS(svgNS, "line");
        end_nominal_thread.setAttribute("x1", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread.setAttribute("y1", axis_top + nominal_diameter * 0.5);
        end_nominal_thread.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread.setAttribute("y2", axis_top - nominal_diameter * 0.5);
        end_nominal_thread.setAttribute("class", "stud thread");

        let end_nominal_thread_upper_champfer = document.createElementNS(svgNS, "line");
        end_nominal_thread_upper_champfer.setAttribute("x1", face_left + nominal_lenght - thread_lenght - end_champfer_lenght);
        end_nominal_thread_upper_champfer.setAttribute("y1", axis_top - nominal_diameter * 0.5);
        end_nominal_thread_upper_champfer.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread_upper_champfer.setAttribute("y2", axis_top - nominal_diameter * 0.5 + thread_offset * this.SCALE);
        end_nominal_thread_upper_champfer.setAttribute("class", "stud thread");

        let end_nominal_thread_lower_champfer = document.createElementNS(svgNS, "line");
        end_nominal_thread_lower_champfer.setAttribute("x1", face_left + nominal_lenght - thread_lenght - end_champfer_lenght);
        end_nominal_thread_lower_champfer.setAttribute("y1", axis_top + nominal_diameter * 0.5);
        end_nominal_thread_lower_champfer.setAttribute("x2", face_left + nominal_lenght - thread_lenght);
        end_nominal_thread_lower_champfer.setAttribute("y2", axis_top + nominal_diameter * 0.5 - thread_offset * this.SCALE);
        end_nominal_thread_lower_champfer.setAttribute("class", "stud thread");

        element.appendChild(upper_nominal_thread);
        element.appendChild(lower_nominal_thread);
        element.appendChild(end_nominal_thread);
        element.appendChild(end_nominal_thread_upper_champfer);
        element.appendChild(end_nominal_thread_lower_champfer);
    }

    draw_implantation(element){
        let face_left = this.FACE_LEFT;

        const IMPL_DIAMETER = 13 * this.SCALE;
        const IMPL_DEEP_LAMAGE = 5 * this.SCALE;
        const IMPLE_CH_LENGHT = 2 * this.SCALE;
        const IMPL_DEEP = 30 * this.SCALE;
        const TIP_LENGHT = 1 * this.SCALE;

        let points = [
            [
                face_left,
                0,
            ],
            [
                face_left,
                this.AXIS_TOP - 0.5 * IMPL_DIAMETER,
            ],
            [
                face_left - IMPL_DEEP_LAMAGE,
                this.AXIS_TOP - 0.5 * IMPL_DIAMETER,
            ],
            [
                face_left - IMPL_DEEP_LAMAGE - IMPLE_CH_LENGHT,
                this.AXIS_TOP - 0.5 * this.base_diameter + this.THREAD_OFFSET * this.SCALE,
            ],
            [
                face_left - IMPL_DEEP,
                this.AXIS_TOP - 0.5 * this.base_diameter + this.THREAD_OFFSET * this.SCALE,
            ],
            [
                face_left - IMPL_DEEP - TIP_LENGHT,
                this.AXIS_TOP,
            ],
            [
                face_left - IMPL_DEEP,
                this.AXIS_TOP + 0.5 * this.base_diameter - this.THREAD_OFFSET * this.SCALE,
            ],
            [
                face_left - IMPL_DEEP_LAMAGE - IMPLE_CH_LENGHT,
                this.AXIS_TOP + 0.5 * this.base_diameter - this.THREAD_OFFSET * this.SCALE,
            ],
            [
                face_left - IMPL_DEEP_LAMAGE,
                this.AXIS_TOP + 0.5 * IMPL_DIAMETER,
            ],
            [
                face_left,
                this.AXIS_TOP + 0.5 * IMPL_DIAMETER,
            ],
            [
                face_left,
                100000,
            ]
        ];

        // Définir l'attribut "points" de la polyline
        let implantation = document.createElementNS(svgNS, "polyline");
        implantation.setAttribute("points", points);
        implantation.setAttribute("class", "stud");

        element.appendChild(implantation);
    }

    draw(element, draw_axis=true, draw_faces=true) {

        this.draw_main_shape(element);
        this.draw_base_thread(element);
        this.draw_nominal_thread(element);
        this.draw_implantation(element);

        if (draw_faces)
            this.draw_faces(element);

        if(draw_axis)
            this.draw_axis(element);
    }
};

class ThightenedPart extends BaseShape {

    constructor(width, offset, class_name){

        super();

        this.class_name = class_name;
        this.offset = offset * this.SCALE;
        this.width = width * this.SCALE;
    }

    draw_upper_rect(element, height){

        let P1 = [
            this.FACE_LEFT + this.offset,
            this.AXIS_TOP - 0.5 * height,
        ];

        let P2 = [
            this.FACE_LEFT + this.offset,
            this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER - this.HOLE_OFFSET
        ];

        let P3 = [
            this.FACE_LEFT + this.offset + this.width,
            this.AXIS_TOP - 0.5 * this.NOMINAL_DIAMETER - this.HOLE_OFFSET,
        ];

        let P4 = [
            this.FACE_LEFT + this.offset + this.width,
            this.AXIS_TOP - 0.5 * height,
        ];

        let points = [P1, P2, P3, P4, P1];

        // Définir l'attribut "points" de la polyline
        let upper_rect = document.createElementNS(svgNS, "polyline");
        upper_rect.setAttribute("points", points);
        upper_rect.setAttribute("class", `part ${this.class_name}`);

        element.appendChild(upper_rect);
    }

    draw_lower_rect(element, height){
        let P1 = [
            this.FACE_LEFT + this.offset,
            this.AXIS_TOP + 0.5 * height,
        ];

        let P2 = [
            this.FACE_LEFT + this.offset,
            this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER + this.HOLE_OFFSET
        ];

        let P3 = [
            this.FACE_LEFT + this.offset + this.width,
            this.AXIS_TOP + 0.5 * this.NOMINAL_DIAMETER + this.HOLE_OFFSET,
        ];

        let P4 = [
            this.FACE_LEFT + this.offset + this.width,
            this.AXIS_TOP + 0.5 * height,
        ];

        let points = [P1, P2, P3, P4, P1];

        // Définir l'attribut "points" de la polyline
        let upper_rect = document.createElementNS(svgNS, "polyline");
        upper_rect.setAttribute("points", points);
        upper_rect.setAttribute("class", `part ${this.class_name}`);

        element.appendChild(upper_rect);
    }

    draw(element){

        const HEIGHT = 20 * this.SCALE;

        this.draw_upper_rect(element, HEIGHT);
        this.draw_lower_rect(element, HEIGHT);
    }
}

function draw_stud() {

    let nominal_diameter = 6;
    let base_diameter = 10;
    let base_lenght = 20
    let nominal_lenght = 30;
    let thread_lenght = nominal_lenght - 5;
    let withdrawal = 1;

    let stud = new Stud(
        nominal_diameter,
        base_diameter,
        base_lenght,
        nominal_lenght,
        thread_lenght,
        withdrawal
    )

    stud.draw(frame, true, false);
}

function draw_parts(){
    let part1 = new ThightenedPart(5, 0, "part1")
    let part2 = new ThightenedPart(5, 5, "part2")

    part1.draw(frame);
    part2.draw(frame);
}

draw_stud();
draw_parts();