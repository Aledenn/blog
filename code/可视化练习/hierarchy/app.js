const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';

/* globals d3 */
(async function () {
  const data = 
  {
    "name":"中国",
    "children":
    [
      { 
        "name":"浙江" , 
          "children":
          [
              {"name":"杭州" },
              {"name":"宁波" },
              {"name":"温州" },
              {"name":"绍兴" }
          ] 
        },
      { 
        "name":"广西" , 
        "children":
        [
          {"name":"桂林"},
          {"name":"南宁"},
        ]
      }
    ]
  }
  // await (await fetch(dataSource)).json();
  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value);

  const pack = d3.pack()
    .size([1600, 1600])
    .padding(3);

  const root = pack(regions);

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const TAU = 2 * Math.PI;

  console.log(root)

  function draw(ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const children = node.children;
    const {x, y, r} = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    if(children) {
      for(let i = 0; i < children.length; i++) {
        draw(context, children[i]);
      }
    } else {
      const name = node.data.name;
      ctx.fillStyle = textColor;
      ctx.font = '1.5rem Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y);
    }
  }

  draw(context, root);
}());