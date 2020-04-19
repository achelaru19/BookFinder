
export const getInitials = (fullname: string) => {
    const name: string[] = fullname.split(" ");
    let initials: string = '';
    for(let i = 0; i < name.length; i++){
        console.log(name[i])
        const initial = name[i].charAt(0);
        initials = initials+initial;
    };

    return initials;
}