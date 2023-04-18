export default function noAccess({ from, to, router }) {
    console.log('Pas d\'acces à la page : ' + to.name);
    router.push({name: from.name})
}