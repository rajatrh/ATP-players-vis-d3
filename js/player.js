// Class Player
class player {

    constructor(p) {
    this.rank = +p.rank;
    this.name = p.name;
    this.nat = p.nat;
    this.age = +p.age;
    this.birth = new Date(p.birth);
    this.turned_pro = +p.turned_pro
    this.weight = +p.weight;
    this.height = +p.height;
    this.plays = p.plays;
    this.aces = +p.aces;
    this.double_faults = +p.double_faults;
    this.f_serve = +p.f_serve;
    this.f_serve_won = +p.f_serve_won;
    this.s_serve_won = +p.s_serve_won;
    this.break_faced = +p.break_faced;
    this.break_saved = +p.break_saved;
    this.serve_played = +p.serve_played;
    this.serve_won = +p.serve_won;
    this.serve_points_won = +p.serve_points_won;
    this.re_f_serve_won = +p.re_f_serve_won;
    this.re_s_serve_won = +p.re_s_serve_won;
    this.break_opp = +p.break_opp;
    this.break_conv = +p.break_conv;
    this.re_games_played = +p.re_games_played;
    this.re_games_won = +p.re_games_played;
    this.re_points_won = +p.re_points_won;
    this.total_points_won = +p.total_points_won;
    this.prize = +p.prize;
    this.prize_year = +p.prize_year;
    this.score = p.score;
    this.score_year = p.score_year;
    this.coach = p.coach;
    this.place_birth = p.place_birth;
    this.residence = p.residence;
    }
     
} 