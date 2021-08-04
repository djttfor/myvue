import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import { getAvatar } from '../lib/public';
export default ({ store }) => {
    if (getAvatar()) store.commit('setAvatar', getAvatar())
    const list = store.state.musicList;
    const options = {
        container: document.getElementById('player'),
        fixed: true,
        theme: '#fe9600',
        listMaxHeight: '300px',
        listFolded: false,
        audio: list
    };
    const ap = new APlayer(options);
    ap.on('ended', function () {
        console.log('player ended');
    });
};