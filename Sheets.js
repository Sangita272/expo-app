import {registerSheet} from 'react-native-actions-sheet';
import ChatInteractionActionsheet from "./src/components/elements/actionsheets/ChatInteractionActionsheet";
import BookListActionsheet from './src/components/elements/actionsheets/BookListActionsheet';

registerSheet('ChatInteractionActionsheet', ChatInteractionActionsheet);
registerSheet('BookListActionsheet', BookListActionsheet);
export {};