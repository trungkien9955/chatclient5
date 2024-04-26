const createFileName = (input) => {
    let output
    output = input.toLowerCase()
    output = output.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    output = output.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    output = output.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    output = output.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    output = output.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    output = output.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    output = output.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    output = output.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    output = output.replace(/ /gi, " - ");
    //Xóa các ký tự gạch ngang ở đầu và cuối
    output = '@' + output + '@';
    output = output.replace(/\@\-|\-\@|\@/gi, '');
    return output
  }
  export default createFileName