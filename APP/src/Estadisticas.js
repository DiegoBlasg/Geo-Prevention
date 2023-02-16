import { useEffect } from "react";

const Estadisticas = () => {
  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < 10; i++) {
          let l = data[i].l;
          let t = data[i].t;
          let tma = data[i].tma;
          let tmi = data[i].tmi;
          let tme = data[i].tme;
          let r = data[i].r;
          let vm = data[i].vm;
          let p1 = data[i].p1;
          let p2 = data[i].p2;
          let p3 = data[i].p3;
          let p4 = data[i].p4;
          let p5 = data[i].p5;
          let m = data[i].m;
          let d = data[i].d;
          let y = data[i].y;
          
          const url = `http://localhost:5002/prediccion?l=${l}&t=${t}&tma=${tma}&tmi=${tmi}&tme=${tme}&r=${r}&vm=${vm}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}&m=${m}&d=${d}&y=${y}`;
          console.log(url);

          fetch(url)
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error));
                }
                });
                
            }, []);
  return (
    <div className="ml-24">
        ESTADISTICAS
    </div>
  );
};

export default Estadisticas;
