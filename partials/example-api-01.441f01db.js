const e="https://65f2d1ae105614e6549efd32.mockapi.io/todos",t=document.getElementById("addBtn"),n=document.getElementById("myUL"),o=document.getElementById("myInput");function a(e,t=!1,o){const a=document.createElement("li");a.id=o,n.appendChild(a),function(e,t,n){const o=document.createElement("input");o.type="checkbox",o.className="update",o.checked=n,e.appendChild(o)}(a,0,t),function(e,t){const n=document.createElement("span"),o=document.createTextNode(t);n.className="text",n.appendChild(o),e.appendChild(n)}(a,e),function(e){const t=document.createElement("span"),n=document.createTextNode("delete");t.className="close",t.appendChild(n),e.appendChild(t)}(a)}function c(e){return e.parentNode.id}window.addEventListener("DOMContentLoaded",(async function(){const t=await(async()=>{try{const t=await fetch(e);if(!t.ok)throw new Error("Failed to fetch todos");return await t.json()}catch(e){console.error(e)}})();t&&t.forEach((({text:e,isDone:t,id:n})=>a(e,t,n)))})),t.addEventListener("click",(()=>{const t=o.value.trim();if(""===t)return void alert("Please enter a todo");a(t);(async t=>{try{if(!(await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)throw new Error("Failed to add todo")}catch(e){console.error(e)}})({text:`${t}`,isDone:!1})})),document.addEventListener("click",(async t=>{const n=t.target;if(n.classList.contains("close")){const t=c(n);await(async t=>{try{if(!(await fetch(`${e}/${t}`,{method:"DELETE"})).ok)throw new Error("Failed to delete todo")}catch(e){console.error(e)}})(t),n.parentNode.remove()}})),n.addEventListener("change",(async t=>{const n=t.target;if(n.classList.contains("update")){const t=c(n),o=n.checked;console.log("Updating LI with ID:",t,"Is Done:",o),await(async(t,n)=>{try{if(!(await fetch(`${e}/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).ok)throw new Error("Failed to update todo")}catch(e){console.error(e)}})(t,{isDone:o})}}));
//# sourceMappingURL=example-api-01.441f01db.js.map
