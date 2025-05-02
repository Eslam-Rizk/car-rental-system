export function showMessage(message, type='success'){
const alertDiv = document.createElement("div"); 
alertDiv.innerHTML=`
<div class="alert alert-${type} fade show shadow alert-dismissible" role="alert" >${message}
<button class="btn-close" type="button"  data-bs-dismiss="alert" aria-label="Close>close</button>
</div>`;
const container = document.getElementById("alertPlaceHolder");
    container.appendChild(alertDiv); 

    setTimeout(()=>{
        const alert = bootstrap.Alert.getOrCreateInstance(container.firstElementChild);
        alert.close();
    }, 3000); 

}