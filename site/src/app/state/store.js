import {create} from 'zustand';

export const useStore = create((set)=>{
    return {
        count : 0,
        increment: ()=>{
            set(function (state){
                return {count : state.count + 1}
            })
        }
    }
});
