//This array controls what days to execute, adjust at will
let days = [1,2,3,4,5,6,7,8];

for (let dayNum of days) {
    let dayImport = await import(`./solutions/day${dayNum}.js`);
    await dayImport.default();
}
