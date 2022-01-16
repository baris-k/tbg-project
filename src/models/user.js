class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.bio = [];
        this.matches = [];
        this.likes = [];
    }

    addMatches(match) {
        this.matches.push(match.filename);
    }

    likeMatch(match) {
        this.likes.push(match.filename);
        match.likedBy.push(this.name);
    }

    get profile() {
        return `${this.name} (${this.age})` +
        `Bio: ${this.bio}` +
        `Matches (${this.matches.length})` +
    
        `${this.matches.map(match => `${match.filename}
            ${match.likedBy.map((user) => user.name).join(", ")}`)
        .join("/n")
    }`
    }

}

module.exports = User

