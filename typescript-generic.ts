interface Iuser{
id:number;
name:string;
}

interface Category{
id:number;
title:string;
}

interface FullDetails{
id:number;
title:string;
extra: Iuser[] | Category[]
}

how to make generic

interface BetterWay <T>{
id:number;
title:string;
extra: T[]
}

const x : BetterWay<String>{
id:1;
title:"Rahul";
extra: ["dcs", "svm"]
}

const y : BetterWay<Category>{
id:1;
title:"Rahul";
extra: [{
id:1;
title:"test";
}]
}
