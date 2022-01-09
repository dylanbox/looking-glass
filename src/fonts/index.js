import { QFontDatabase } from '@nodegui/nodegui';

import BioRhymeExtraLight from './BioRhyme_Expanded/BioRhymeExpanded-ExtraLight.ttf';
import BioRhymeLight from './BioRhyme_Expanded/BioRhymeExpanded-Light.ttf';
import BioRhymeRegular from './BioRhyme_Expanded/BioRhymeExpanded-Regular.ttf';
import BioRhymeBold from './BioRhyme_Expanded/BioRhymeExpanded-Bold.ttf';
import BioRhymeExtraBold from './BioRhyme_Expanded/BioRhymeExpanded-ExtraBold.ttf';

import JosefinSans from './Josefin_Sans/JosefinSans-VariableFont_wght.ttf';
import JosefinSansItalic from './Josefin_Sans/JosefinSans-Italic-VariableFont_wght.ttf';

/**
 * Adds a font to the application font database and returns its name
 *
 * @param {String} path The path to the font
 * @returns {String} The name of the font as referenced by the application
 */
const addFont = (path) => {
  const id = QFontDatabase.addApplicationFont(`${process.env.PWD}/${path}`);
  return QFontDatabase.applicationFontFamilies(id);
};

export default {
  // ===== BioRhyme Expanded =====
  // 200
  BioRhymeExtraLight: addFont(BioRhymeExtraLight),
  // 300
  BioRhymeLight: addFont(BioRhymeLight),
  // 400
  BioRhymeRegular: addFont(BioRhymeRegular),
  // 700
  BioRhymeBold: addFont(BioRhymeBold),
  // 800
  BioRhymeExtraBold: addFont(BioRhymeExtraBold),
  // ===== Josefin Sans =====
  // 100 - 700
  JosefinSans: addFont(JosefinSans),
  // 100 - 700
  JosefinSansItalic: addFont(JosefinSansItalic),
};
