<template>
              <v-card horizontal class="mb-2" :class="currentStatut" >

                    <v-card-column>
                        <v-card-text>
                            <v-row>
                                <v-col xs4>

                                    <strong>{{mandat.name}}</strong><br>
                                    <span>{{mandat.costs}}</span>,
                                    <span>{{mandat.type}}</span>,
                                    <span>1 Word</span>,
                                    <span>{{mandat.source}}--&#62;{{mandat.target}}</span>,
                                    <span>SDL? {{mandat.TAO}}</span>
                                </v-col>
                                <v-col xs1 >

                                    <strong>{{mandat.code}}</strong>
                                    <div :class="{prioritaireClass: mandat.priority === 'Prioritaire'}">{{mandat.priority}}</div>

                                </v-col>
                                        <v-col xs1>

                                    <div>{{mandat.mandant}}</div>
                                    <div>{{mandat.public_cible}}</div>

                                </v-col>
                                <v-col xs2 class="text-xs-center">

                                    <div>
                                        <v-icon>move_to_inbox</v-icon>
                                        <span>{{mandat.arrival}}</span>
                                    </div>
                                    <div>
                                        <v-icon>send</v-icon>
                                        <span>{{mandat.deadline}}</span>
                                    </div>

                                </v-col>
                                <v-col xs2>

                                    <div>
                                        <v-icon>edit</v-icon>
                                        <span class="responsable">{{mandat.translator}}</span>
                                    </div><div class="responsable">
                                        <v-icon>spellcheck</v-icon>
                                        <span class="responsable">{{mandat.reviewer}}</span>
                                    </div>

                                </v-col>
                                <v-col xs2>

<!--                                    <v-btn outline class="orange--text buttonTest" @click.native="liquidation">{{mandat.activity}}</v-btn>-->
                                    
                                         <v-select 
            :items="statuts"
            v-model="mandat.statut"
            label="statut"
            light
            single-line
            auto
          />


                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card-column>


                </v-card>
</template>

<script>
    export default {
        props: ['mandat'],
        data() {
            return {
                statuts: ['En traduction', 'Questions', 'Prêt pour révision', 'Révision finie', 'Liquidé'],
            };
        },
        methods: {
            setStatut() {
                const payload = {
                    key: this.mandat['.key'],
                    newStatut: this.mandat.statut
                };
                this.$emit('changedStatut', payload);
            }
        },
        computed: {
            currentStatut() {
                if (this.mandat.statut === 'En traduction') {
                    this.setStatut();
                    return 'amber lighten-1 black--text';
                } else if (this.mandat.statut === 'Questions') {
                    this.setStatut();
                    return 'red darken-1 black--text';
                } else if (this.mandat.statut === 'Prêt pour révision') {
                    this.setStatut();
                    //send email
                    return 'light-blue lighten-1 black--text';
                } else if (this.mandat.statut === 'Révision finie') {
                    this.setStatut();
                    //send email
                    return 'brown darken-1 black--text';
                } else if (this.mandat.statut === 'Liquidé') {
                    this.setStatut();
                    // notification
                    return 'light-green accent-4 black--text';
                } else {
                    alert('Erreur: statut de mandat inconnu');
                }
            }
        }
    };

</script>

<style>
    .prioritaireClass {
        color: red;
    }

</style>
