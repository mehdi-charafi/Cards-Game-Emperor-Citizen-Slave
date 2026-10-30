
import { getActiveProfile, getProfiles } from "./storage"


export function nicknameValidation(inputValue) {
   let isVliad1 = /^[A-Za-z0-9]{3,15}$/.test(inputValue)
   let isValid2 = getProfiles().some((p) => p[`nickname`].toLowerCase() == inputValue.toLowerCase())

   if(isVliad1 == true && isValid2 == false) {
      return true
   } else {
      return false
   }

}

export function profileRendering(profilesSection) {
   let profiles = getProfiles()
   if(profiles.length == 0)return
      profilesSection.innerHTML = ""
   profiles.forEach((p) => {
      profilesSection.innerHTML += `
      <div data-nickname="${p.nickname}" class="profile-card flex gap-5 text-white m-5 border-1 border-slate-600 rounded-2xl p-2 items-center justify-between lg:w-[300px]">
        <div id="icon+name" class="flex gap-5 item-center"><div><span class="profile-avatar iconify text-amber-400 w-13 h-13 border-2 border-slate-600 rounded-xl" data-icon=${p.avatar}></span> </div><div><p>${p.nickname}</p></div></div><div id="button" class="select-btn flex items-center gap-4"><button type="button" class="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] p-2 rounded-3xl cursor-pointer  lg:w-[85px]">Select</button><span id="remove-profile" class="delete-btn cursor-pointer text-red-400">X</span></div></div>
        
      </div>
      `
   
   })
   
}

export function loginRendering(loginSection) {
   let activeProfile = getActiveProfile()
   if(!activeProfile.nickname)return
   console.log(activeProfile)
   loginSection.innerHTML = `
   <div class="flex text-center gap-2">
      <span class="iconify text-amber-400 w-13 h-13 border-2 border-slate-600 rounded-xl" data-icon="${activeProfile.avatar}"></span>
      <p class="text-bold text-2xl text-amber-100">${activeProfile.nickname}</p>
  </div>
   `
}

