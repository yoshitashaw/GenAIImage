import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    //to check that we dont get same prompt again
    if(randomPrompt === prompt)
        return getRandomPrompt(prompt);

    return randomPrompt;
}