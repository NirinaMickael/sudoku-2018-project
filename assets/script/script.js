let theInput=document.querySelectorAll('input');
/*AFFICHAGE*/
let btn = document.querySelectorAll('button');


btn.forEach(item=>{
    item.addEventListener('click',function(){
      if(item.id=='yes'){
        document.querySelector('.alert').style.display='none';
        document.querySelector('.container').style.display='block';
      }else{
        window.history.back();
      }        
    })  
})
/* verifier chaque ligne et colonne du tableau*/
function check(matrice,X,Y,style){
    let j=0,k=0,booltab=[];
    while( k<matrice.length){
       while(j<matrice[k].length){
        if(Y!=j){
         booltab.push(matrice[X][Y][style]!=matrice[X][j][style]);/*verification par colonne*/
         j++;
        }
        else{
            j++;
        }
       }
       if(X!=k){
           booltab.push(matrice[X][Y][style]!=matrice[k][Y][style]);/*Verification par ligne*/
           k++;
       }else{
          k++;
       }
   }
   return booltab;
 }
 function Transforme(tab) {
   /* function transforme: Manova ilay input rehetra ho Matrice azo exploitena*/
    let  NewInput=[[],[],[],[],[],[],[],[],[]],j,count=0,i=0;
    //NewInput est un tableau 2 dimension
    while(i<NewInput.length){
        j=0;
        while(j<NewInput.length){
            NewInput[i].push(tab[count]);
            j++;
            count++;
        }
        i++;
    }
    return NewInput;
}
/* CLASS CreateRandomplace :
    pour faire les inputs en case non autorise 
*/
function CreateRadomplace(CaseDisabled){
    this.CaseDisabled=CaseDisabled,
    this.matrice=Transforme(this.CaseDisabled),
    this.indexRandom=function(){ // ça sert randomiser les case Noir;
        let i=0,j=0;
        while(i<this.matrice.length){
            j=0;
            while(j<Math.floor(Math.random()*10)){ //nombre de case noir a chaque ligne sera entre 0 et 6
                this.matrice[i][Math.floor(Math.random()*9)].style.backgroundColor='black';
              j++;
            }
            i++;
        }
        this.valueRandom();   
    },
    this.valueRandom=function(){// ça sert a remplir au hasard les case Noir
      let i=0,j,a=0,b=0;
     while(i<this.matrice.length){
      j=0;
       while(j<this.matrice[i].length){
        if(getComputedStyle(this.matrice[i][j],null).backgroundColor=='rgb(0, 0, 0)'){
          this.matrice[i][j].disabled=true;
          this.matrice[i][j].value=Math.floor(Math.random()*9)+1;
          this.checking(i,j);
        }
          j++;
        }
        i++;
    }
   },
   this.checking=function(X,Y){/*algorithme de verification et sert a modifier lorsque la valeur au pos X,Y 
                               est deja existe le long de pos X et le long de pos X*/
    let j=0,k=0;
    while( k<this.matrice.length){
        //partie Y
       while(j<this.matrice[k].length){
          if(Y!=j){
            if(this.matrice[X][Y].value!=this.matrice[X][j].value){
              j++;
            }else{
              j=0;
              this.matrice[X][Y].value=Math.floor(Math.random()*9)+1;
            }
          }else{
            j++;
          }
       }
       //partie X
       if(X!=k){
           if(this.matrice[X][Y].value!=this.matrice[k][Y].value){
             k++;
           }else{
             k=0;
            this.matrice[X][Y].value=Math.floor(Math.random()*9)+1;
           }
       }else{
          k++;
       }
   }
   }
}
let plateaux=new CreateRadomplace(theInput);/* un Objet plateaux est un instance d'un class CreatRandom
                         */
plateaux.indexRandom();
(function(){ /* fonction sert a manipuler les affichage et verifier les valeur d'utilisateur
  */ 
    function getPosY(matrix,val){
        let posY=0,j;
        for(let i=0;i<matrix.length;i++){
            j=0;
            while(j<matrix[i].length){
                if(matrix[i][j]==val){
                  posY=i;
                }
             j++;
            }
        }
    return posY;
    }
    let data={},Matrix=Transforme(theInput);
    for(let i=0;theInput.length>i;i++){
        data[theInput[i].id]=function(val){
        let item =theInput[i].id,input=document.getElementById(item),
            pos={Y:val,X:getPosY(Matrix,input)},
            result2=[],style="value";
            result=parseInt(input.value)>10 || parseInt(input.value)==0 || input.value=='' || isNaN(input.value);
            /***********/
            /****** */
            let x=0;
        result2=check(Matrix,pos.X,pos.Y,style);
    /* 
    */
            /******* */
            if(result || result2.indexOf(false)!=-1){
            input.classList.remove('correct');
            input.classList.add('incorrect');
            }
            else{
                input.classList.remove('incorrect');
                input.classList.add('correct');
            }
        }
    }
    Matrix.forEach(Element=>{
      Element.forEach(item=>{
          item.addEventListener('keyup',function(){
             data[this.id](Element.indexOf(item)); /* Verification a chaque touche taper*/    
          })
      })
    })
})();
