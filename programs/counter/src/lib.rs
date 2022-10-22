use anchor_lang::prelude::*;

declare_id!("GjhgEtT1bkmceCyQ4ozKtq26kG88pz6BoXsK9EAofxYz");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, count: u64) -> Result<()> {
        let data = &mut ctx.accounts.my_account;
        data.counter = count;
        msg!("Counter : {:?} ", data.counter);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=signer, space=8+8+1)]
    pub my_account: Account<'info,Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Counter {
    pub counter : u64,
    pub is_initialized : bool
}
