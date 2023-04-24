/***
 *  Interface to vendor https://dictionaryapi.dev
 * 
 * Query using HTTP GET https://api.dictionaryapi.dev/api/v2/entries/en/keyboard  
*/

async  function dictionaryApi(word){
 setBusy(true);
 try{
   const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
   );
   if(res.status !== 200){
    const result = await res.json();
    result.error = res.status;
    setBusy(false);
    return result;
   } else{
    setBusy(false);
    return await res.json();
   }
 }catch (err){
   setBusy(false)
   console.log(err)
   return{
    error: 500,
    title: "server error",
    message: "reached error dictionaryapi"
   }
 }
}


function setBusy(isBusy){
    const ariaBusy = Array.from(document.querySelectorAll("[aria-busy]"))
    ariaBusy.forEach((a) =>
        a.setAttribute("aria-busy", isBusy ? "true": "false")
    ) 
}
export default dictionaryApi;


