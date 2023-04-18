export default function log({ next, to }) {
    console.log('log : ' + to.name);
    return next();
}