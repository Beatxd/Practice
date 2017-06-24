if (!Object.create) {
    Object.create = function (proto) {
        function Empty() {
        }
        Empty.prototype = proto;
        return new Empty();
    }
}