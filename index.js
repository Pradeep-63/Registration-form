
const form=document.getElementById('form');
const uname=document.getElementById('name')
const email=document.getElementById('email');
const contact_number=document.getElementById('contact-number');
const password=document.getElementById('password');
const confirmpassword=document.getElementById('cpassword');
const updateBtn=document.getElementById('update')
var indexval=-1;
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const success=validateForm();
    if(success){
        if(confirm("do you want to submit the data")){
            storeData()
            const localData=retrieveDataFromLocal();
            createRow(localData); 
        }
        else{
            form.reset();
        }
            
    }
    

})
//error msg functiom
function errorMsg(input,msg){
    const form_control=input.parentElement;
    form_control.className="form-control error"
    const span=form_control.querySelector("span");
    span.innerHTML=msg;

}
//success function
function successMsg(input){
    const form_control=input.parentElement;
    form_control.className="form-control success"

}
function validateForm(){
    
    var success1,success2,success3,success4,success5;
    //name validation
    success1=myName();
    //email validarion
    success2=myEmail();
    //contact validation
    success3=myContact();
    //password validation
    success4=myPass();
    //confirm password
    success5=myCpass();
    if(success1 && success2 && success3 && success4 && success5){
      return true;
    }
    else{
        return false;
    }

}
//store data in local storage
function storeData(){
    const userobject={
        nameval:uname.value.trim(),
        email:email.value.trim(),
        phone:contact_number.value.trim(),
        password:password.value.trim(),
        cpassword:confirmpassword.value.trim()
    } 
    let users=localStorage.getItem('users');
    
        if(!users){
            users=[]
        }
        else{
            users = JSON.parse(users);
        }
    users.push(userobject);
    form.reset();
    localStorage.setItem('users', JSON.stringify(users));
    

}
function retrieveDataFromLocal(){
    const storedData=localStorage.getItem('users');
    if(!storedData){
        return null;
    }
    const jsobjectvalue=JSON.parse(storedData)
    return jsobjectvalue;

   
}
function createRow(localstorageData){
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    usersTable.innerHTML = '';
    
    if(localstorageData){
    localstorageData.forEach((user,index)=>{
        var row=usersTable.insertRow();
        row.insertCell(0).innerHTML=user.nameval;
        row.insertCell(1).innerHTML=user.email;
        row.insertCell(2).innerHTML=user.phone;
        row.insertCell(3).innerHTML=user.password;
        row.insertCell(4).innerHTML=user.cpassword;
         const actionsCell = row.insertCell(5);
        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.setAttribute('class','edit')
        editButton.onclick = () => editUser(index);
        actionsCell.appendChild(editButton);
        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('class','edit')
        deleteButton.onclick = () => deleteUser(index);
        actionsCell.appendChild(deleteButton);
    

    })  
    
}        

}

function editUser(index){
    btn.hidden = true;
    updateBtn.hidden = false;
    const users=JSON.parse(localStorage.getItem('users'));
    const user=users[index];
    document.getElementById("name").value=user.nameval
    document.getElementById("email").value=user.email;
    document.getElementById("contact-number").value=user.phone;
    document.getElementById("password").value=user.password
    document.getElementById("cpassword").value=user.cpassword
    indexval=index;
}
updateBtn.addEventListener('click',(event)=>{
    btn.hidden =false; 
    updateBtn.hidden = true;
    event.preventDefault();
    const success=validateForm();
    if(success){
        const userobject={
            nameval:uname.value.trim(),
            email:email.value.trim(),
            phone:contact_number.value.trim(),
            password:password.value.trim(),
            cpassword:confirmpassword.value.trim()
        } 
        let users=localStorage.getItem('users');
        
            if(!users){
                users=[]
            }
            else{
                users = JSON.parse(users);
            }
        users[indexval]=userobject;
        form.reset();
        localStorage.setItem('users', JSON.stringify(users));
        const localData=retrieveDataFromLocal();
         createRow(localData);   
    }
     
})

//delete the row
function deleteUser(index) {
    btn.hidden =false; 
    updateBtn.hidden = true;
    form.reset();
    if(confirm("Are you sure you want to delete")){
    let users = JSON.parse(localStorage.getItem('users'));
    if (users) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        createRow(users);
       
    }
 }
}
function myName(){
    const uname=document.getElementById('name');
    const correct=/^[A-Za-z]+$/
    if(uname.value===""){
        errorMsg(uname,"name can't be empty")
    }
    else if(uname.value.length <= 2){
        errorMsg(uname,"name must be 3 character")  
    }
    else if(uname.value.length>20){
        errorMsg(uname,"name can't be greater than 20 character") 
    }
    else if(!uname.value.match(correct)){
        errorMsg(uname,"name can't be digit,special character and space")   
    }
    else{
        successMsg(uname);
        return true;
    }
}
function myEmail(){
    if(email.value===""){
        errorMsg(email,"email can't be empty")
    }
    else if(!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        errorMsg(email,"please enter a valid format")
    }
    else{
        successMsg(email);
        return true;
    }
}
function myContact(){
    if(contact_number.value===""){
        errorMsg(contact_number,"phone number can't be empty")
    }
    else if(isNaN(contact_number.value)){
        errorMsg(contact_number,"only numeric values allowed")
    }
    else if(contact_number.value.length<10 ){
        errorMsg(contact_number,"number must be 10 digit")
    }
    else if(contact_number.value.length>10){
        errorMsg(contact_number,"number can't be greater than 10 digit")
    }
    else{
        successMsg(contact_number);
        return true;
    }
}
function myPass(){
    if(password.value===""){
        errorMsg(password,"password can't be empty")
    }
    else if(password.value.length<5){
        errorMsg(password,"password length must be greater tha 5 character");
    }
    else if(password.value.length>20){
        errorMsg(password,"password can't be greater than 20 character")
    }
    else{
        successMsg(password);
        return true;
    }
}
function myCpass(){
    if(confirmpassword.value==""){
        errorMsg(confirmpassword,"confirm password can't be empty")
        }
        else if(confirmpassword.value!==password.value){
            errorMsg(confirmpassword,"password is not match")
        }
        else{
          successMsg(confirmpassword)
          return true;
        }

        // if(success1 && success2 && success3 && success4 && success5){
        //   return true;
        // }
        // else{
        //     return false;
        // }
}

let users = JSON.parse(localStorage.getItem('users'));
window.onload=createRow(users);



