export default function checkFlag(flag) {
    //manually change some incorrect flag iso codes
    switch (flag) {
        case "is":
            return "il";
        case "zh":
            return "cn";
        default:
            return flag;
    }
}
