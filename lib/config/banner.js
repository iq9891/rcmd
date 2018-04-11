// 公共函数
const { zeroFill, pkg } = require( '../common' );

module.exports = function(isdev) {
  const oTime = new Date();
  const oAllTime = oTime.getFullYear() + '-' + zeroFill( oTime.getMonth() + 1 ) + '-' + zeroFill(oTime.getDate()) + ' ' + zeroFill(oTime.getHours()) + ':' + zeroFill(oTime.getMinutes()) + ':' + zeroFill(oTime.getSeconds());

  const author = pkg.author || '李梦龙';

  const devBanner = '/*!\n' +
  ' * @ name ' + pkg.name + '\n' +
  ' * @ author '+ author +'\n' +
  ' * @ version ' + pkg.version +'\n' +
  ' * @ time ' + oAllTime +'\n' +
  ' */';

  return isdev ? devBanner : '@ name ' + pkg.name + '\n@ author '+ author +'\n@ version ' + pkg.version + '\n@ time ' + oAllTime;
};
