"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.sampleUsers = sampleUsers;
var User = /** @class */ (function () {
    function User(id, fullName, emailAddress) {
        this.id = id;
        this.fullName = fullName;
        this.emailAddress = emailAddress;
    }
    User.prototype.getProfile = function () {
        return "".concat(this.fullName, " (").concat(this.emailAddress, ")");
    };
    return User;
}());
exports.User = User;
function sampleUsers() {
    var user1 = new User(1, 'Rahul Mehta', 'rahul.mehta@example.com');
    var user2 = new User(2, 'Sneha Kapoor', 'sneha.kapoor@example.com');
    return [user1, user2];
}
