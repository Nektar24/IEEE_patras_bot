module.exports = {
    getheader(member,extra,roles,test){
        return {
            "Φωτογραφία Προφίλ"                 :   test?"":(member.user.avatarURL({dynamic:true})?`=IMAGE("${member.user.avatarURL({dynamic:true})}")`:"Δεν έχει φωτογραφία"),
            "Ονοματεπώνυμο"                     :   member.nickname,
            "Discord nickname"                  :   member.user.tag,
            "Chapter"                           :   this.hastheseroles(roles,['EMB Society','PES Society','Computer Society']),
            "Committiees"                       :   this.hastheseroles(roles,['Design','Social','Media','IT','FR','Logistics','HR']),
            "SG"                                :   this.hastheseroles(roles,['Biomedical', 'AI', 'Robotics', 'Programming', 'Competitive', 'Quantum', 'Smart Building', 'Autonomous Vehicle', 'Power Grid', 'Podcast']),
            "Επιλεγμένοι Ρόλοι"                 :   roles,
            "HR Άτομο που ανέλαβε"              :   extra.hr,
            "Ολοκληρώθηκε (Ναι/Οχι)"            :   extra.completed,
            "Σημειώσεις"                        :   extra.notes,
            "Ύπαρξη ρόλου Volunteers"            :   this.exists(roles,"Volunteers"),
            "Ύπαρξη ρόλου Observer"             :   this.exists(roles,"Observer"),
            "Ύπαρξη ρόλου Executive Committee"  :   this.exists(roles,"Executive Committee"),
            "Ύπαρξη ρόλου SG Coordinator"       :   this.exists(roles,"SG Coordinator"),
            "Ύπαρξη ρόλου Mods"                 :   this.exists(roles,"Mods"),
            "Ύπαρξη ρόλου Mentoring"            :   this.exists(roles,"Mentoring"),
            "Ύπαρξη ρόλου Heads of Committes"   :   this.exists(roles,"Heads of Committes"),
            "Ύπαρξη ρόλου PR Heads"             :   this.exists(roles,"PR Heads"),
            "Ύπαρξη ρόλου Bots"                 :   this.exists(roles,"Bots")
        };
    },
    getroles(member){
        let roles = "";
        member.roles.cache.forEach(role => {
            roles = roles.concat(role.name+", ");
        });
        roles = roles.replace("@everyone","");
        roles = roles.substring(0, roles.length - 4);

        return roles;
    },
    exists(roles,role){
        if (roles.includes(` ${role}`)) return "Yes";
        else return "No";
    },
    hastheseroles(roles,table){
        let output = [];
        for (let i = 0; i < table.length ; i++){
            if (roles.includes(table[i])) output.push(table[i]);
        }
        return output.join(" - ");
    },
    run(member,extra){
        return this.getheader(member,extra,this.getroles(member));
    }
}
